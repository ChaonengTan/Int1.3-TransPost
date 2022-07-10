import { gql } from '@apollo/client'

export default gql`
query translatePost($title: String!, $message: String!, $target: String!) {
    translatePost(title: $title, message: $message, target: $target) {
        title
        message
    }
}`
// query {
//     translatePost(title: "this is title", message: "message", target: "ja") {
//       title
//       message
//     }
//   }