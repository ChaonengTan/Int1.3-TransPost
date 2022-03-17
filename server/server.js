// imports
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const { GraphQLJSON, GraphQLJSONObject } = require('graphql-type-json');
const cors = require('cors')
const request = require('request')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()

// init
const client = new MongoClient(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })

// schema
const schema = buildSchema(`
scalar JSON
type User {
    _id: String!
    username: String!
    password: String
}
type Post {
    _id: String!
    title: String
    message: String
    author: String
}
type Query {
    translatePost(title: String!, message: String!): Post!
    findOne(id: String!): Post!
    findAll: [Post!]
    verifyUser(username: String!, password: String!): User!
}
type Mutation {
    createPost(post: JSON!): Boolean
    createUser(username: String!, password: String!): User
}
`)

// resolvers
const root = {
    translatePost: async (title, message) => {
        // perameters
        const options = {
            method: 'POST',
            url: 'https://google-translate1.p.rapidapi.com/language/translate/v2/detect',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'accept-encoding': 'application/gzip',
                'x-rapidapi-key': process.env.API_KEY,
                'x-rapidapi-host': 'google-translate1.p.rapidapi.com',
                useQueryString: true
            },
            form: {q: title}
        }
        // execute request
        request(options, (error, response, body) => {
            if (error) throw new Error(error)
            return body
        })
    },
    createPost: async (post) => {
        // connect to the db
        await client.connect()
        const collection = client.db("transpost").collection("post");
        // inserts a post to collection
        const insert = await collection.insertOne(post)
        client.close()
        return insert ? true : false
    },
    findOne: async ({id}) => {
        // connect to the db
        await client.connect()
        const collection = client.db("transpost").collection("post")
        // finds one post by id
        const oid = new ObjectId(id)
        const data = await collection.findOne({_id: oid})
        client.close()
        const res = {_id: data._id.toString(), title: data.post.title, message: data.post.message, author: data.post.author}
        return res
    },
    findAll: async () => {
        // connect to the db
        await client.connect()
        const collection = client.db("transpost").collection("post")
        // gets all data
        const res = await collection.find({}).toArray()
        client.close()
        const data = res.map(obj => {
            return {_id: obj._id.toString(), title: obj.post.title, message: obj.post.message, author: obj.post.author}
        })
        return data
    },
    createUser: async ({username, password}) => {
        // connect to the db
        await client.connect()
        const collection = client.db("transpost").collection("user")
        const user = {username, password}
        // checks if user exist
        const alreadyExist = await collection.findOne({username: user.username})
        if (alreadyExist) return null
        // inserts the user
        const insertRes = await collection.insertOne(user)
        client.close()
        user._id = insertRes.insertedId.toString()
        return user
    },
    verifyUser: async ({username, password}) => {
        client.connect()
        client.connect(err => {
            const collection = client.db("transpost").collection("user");
            // creates a user
            result = collection.findOne({username: username, password: password})
            if (!result) throw new Error('db createUser error')
        })
        client.close();
        return result
    }
}

// app
const app = express()

app.use(cors())
// route
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
}))

// start
const port = 4000
app.listen(port, () => {
    console.log('Running on port:'+port)
    console.log(`http://localhost:${port}/graphql`)
})