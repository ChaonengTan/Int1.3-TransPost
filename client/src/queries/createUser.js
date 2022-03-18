import { gql } from '@apollo/client'

export default gql`
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