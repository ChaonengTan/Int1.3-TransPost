import { gql } from '@apollo/client'

const createPost = gql`
mutation createPost($post: JSON!) {
    createPost(post: $post)
}`
// mutation {
//     createPost(post: {title: "testPost", message:"testing createPost mutation", author: "graphql"})
// }

const createUser = gql`
mutation createUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
        _id
        username
    }
}`
// mutation {
//     createUser(username: "userTest", password: "differentPassword3"){
//       _id
//       username
//       password
//     }
//   }

const translatePost = gql`
query translatePost($title: String!!, $message: String!) {
    translatePost(title: $title, message: $message) {
        title
        message
    }
}`

const findOne = gql`
query findOne($id: String!) {
    findOne(id: $id) {
        _id
        title
        message
        author
    }
}`
// query {
//     findOne(id: "62319085d22ed3e8476b3aaa") {
//       _id
//       title
//       message
//       author
//     }
//   }


const findAll = gql`
query findAll {
    findAll {
        _id
        title
        message
        author
    }
}`
// query {
//     findAll {
//       _id
//       title
//       message
//       author
//     }
//   }


const verifyUser = gql`
query verifyUser($username: String!, $password: String!) {
    verifyUser(username: $username, password: $password) {
        _id
        username
    }
}`

export default {
    createPost,
    createUser,
    translatePost,
    findOne,
    findAll,
    verifyUser,
}