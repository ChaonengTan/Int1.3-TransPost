import { useState } from 'react'
import { useMutation } from '@apollo/client'
import createPost from '../queries/createPost'

export default function CreatePost() {
    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('')
    const [uploadPost] = useMutation(createPost, {
        variables: { post: {title, message} }
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