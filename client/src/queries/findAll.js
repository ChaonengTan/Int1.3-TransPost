import { gql } from '@apollo/client'

export default gql`
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