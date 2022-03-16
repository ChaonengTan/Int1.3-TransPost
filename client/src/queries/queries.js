import { gql } from '@apollo/client'

const createPost = gql`
mutation createPost($post: Post!) {
    createPost(post: $post)
}`

const createUser = gql`
mutation createUser($user: User!) {
    createUser(user: $user) {
        _id
        username
    }
}`

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

const findAll = gql`
query findAll {
    findAll {
        _id
        title
        message
        author
    }
}`

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