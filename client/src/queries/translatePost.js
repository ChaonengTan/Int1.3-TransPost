import { gql } from '@apollo/client'

export default gql`
query translatePost($title: String!, $message: String!) {
    translatePost(title: $title, message: $message) {
        title
        message
    }
}`