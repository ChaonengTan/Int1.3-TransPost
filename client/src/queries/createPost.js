import { gql } from '@apollo/client'

export default gql`
mutation createPost($post: JSON!) {
    createPost(post: $post)
}`
// mutation {
//     createPost(post: {title: "testPost", message:"testing createPost mutation", author: "graphql"})
// }