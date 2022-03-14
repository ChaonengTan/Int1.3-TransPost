// imports
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const fetch = require('node-fetch')
const { GraphQLJSON, GraphQLJSONObject } = require('graphql-type-json');
const cors = require('cors')

// schema
const schema = buildSchema(`
    type Post {
        id: String!
        message: String!
        author: String!
    }
    type Query {
        getAllPosts(): Data!
    }
`)

// resolvers
const root = {
    getWorldstate: async (location) => {
        // fetch
        const url = (location) => `https://api.warframestat.us/pc/${location.location}`
        const res = await fetch(url(location))
        const json = await res.json()

        // standard returns
        const activation = json.activation
        const expiry = json.expiry
        const id = json.id
        const state = json.state ? json.state : json.active

        // timeLeft
        const currentTime = new Date()
        const expTime = new Date(expiry)
        const timeLeft = (expTime-currentTime)/1000
        return { activation, expiry, id, state, timeLeft }
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