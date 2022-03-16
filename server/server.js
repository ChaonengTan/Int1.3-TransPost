// imports
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const cors = require('cors')
const request = require('request')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

// init
const client = new MongoClient(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })

// schema
const schema = buildSchema(`
type User {
    _id: String!
    username: String!
    password: String
}
type Post {
    _id: String
    title: String!
    message: String!
    author: String!
}
type Query {
    translatePost(title: String!, message: String!): Post!
    findOne(id: String!): Post!
    findAll: [Post!]!
    verifyUser(username: String!, password: String!): User!
}
type Mutation {
    createPost(post: Post!): Boolean!
    createUser(user: User!): User!
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
            form: {q: title, q: message}
        }
        // execute request
        request(options, (error, response, body) => {
            if (error) throw new Error(error)
            return body
        })
    },
    createPost: async (post) => {
        // connect to the db
        client.connect(err => {
            const collection = client.db("transpost").collection("post");
            // inserts a post to collection
            collection.insertOne(post)
        })
        client.close();
        return true
    },
    findOne: async (id) => {
        let result
        // connect to the db
        client.connect(err => {
            const collection = client.db("transpost").collection("post");
            // finds one post by id
            result = collection.findOne({_id: id})
            if (!result) throw new Error('db findOne error')
        })
        client.close();
        return result
    },
    findAll: async () => {
        let result
        // connect to the db
        client.connect(err => {
            const collection = client.db("transpost").collection("post");
            // gets all results
            result = collection.find()
            if (!result) throw new Error('db findAll error')
        })
        client.close();
        return result
    },
    createUser: async (user) => {
        let result
        // connect to the db
        client.connect(err => {
            const collection = client.db("transpost").collection("user");
            // checks if username has been used
            if (collection.findOne({username: user.username})) {
                throw new Error('user with this username already exists')
            }
            // creates a user
            collection.insertOne(user)
            result = collection.findOne(user)
            if (!result) throw new Error('db createUser error')
        })
        client.close();
        return result
    },
    verifyUser: async (username, password) => {
        let result
        // connect to the db
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