import { gql } from '@apollo/client'

export default gql`
query verifyUser($username: String!, $password: String!) {
    verifyUser(username: $username, password: $password) {
        _id
        username
    }
}`
// query {
//     verifyUser(username: "userTest", password: "password123") {
//       _id
//       username
//       password
//     }
//   }