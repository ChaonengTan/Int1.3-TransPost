import { useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import createPost from '../queries/createPost'
import createUser from '../queries/createUser'

export default function CreatePost() {
    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('')
    // const [uploadPost, { data }] = useLazyQuery(createPost, {
    //     variables: { post: {title, message} }
    // })
    const [uploadPost, { data }] = useLazyQuery(createUser, {
        variables: { username: 'test', password: "123" }
    })
    return(
        <form onSubmit={e => {
            e.preventDefault()
            uploadPost()
        }}>
            <label>
                <h3>Title:</h3>
                <input type='text' placeholder='Title' onChange={e => {
                    setTitle(e.target.value)
                }}></input>
            </label>
            <label>
                <h3>Message:</h3>
                <input type='text' placeholder='Message' onChange={e => {
                    setMessage(e.target.value)
                }}></input>
            </label>
            <button type='submit'>Submit</button>
        </form>
    )
}