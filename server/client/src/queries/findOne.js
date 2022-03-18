import { gql } from '@apollo/client'

export default gql`
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