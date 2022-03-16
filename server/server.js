// imports
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const cors = require('cors')
const request = require('request')
const { MongoClient, ServerApiVersion } = require('mongodb');

import { API_KEY, URI } from './env'

// init
const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// schema
const schema = buildSchema(`
    type Post {
        id: String!
        title: String!
        message: String!
        author: String!
    }
    type Query {
        getAllPosts(): [Post!]!
        translatePost(title: String!, message: String!): Post!
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
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': 'google-translate1.p.rapidapi.com',
                useQueryString: true
            },
            form: {q: title, q: message}
        }
        // execute request
        request(options, (error, response, body) => {
            if (error) throw new Error(error);
            console.log(body)
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
    },
    findOne: async (id) => {
        let result
        // connect to the db
        client.connect(err => {
            const collection = client.db("transpost").collection("post");
            // finds one post by id
            result = collection.findOne({_id: id})
        })
        client.close();
        return result ? result : new Error('db findOne error')
    },
    findAll: async () => {
        let result
        // connect to the db
        client.connect(err => {
            const collection = client.db("transpost").collection("post");
            // gets all results
            result = collection.find()
            
        })
        client.close();
        return result ? result : new Error('db findAll error')
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