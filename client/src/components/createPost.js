import { useState } from 'react'
import { useMutation } from '@apollo/client'
import createPost from '../queries/createPost'
import './styles/createPost.css'

export default function CreatePost() {
    const author = JSON.parse(sessionStorage.getItem('user')).username
    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('')
    const [uploadPost] = useMutation(createPost, {
        variables: { post: {title, message, author} }
    })
    return(
        <form className='createPost' onSubmit={e => {
            e.preventDefault()
            if (title!=='' && message!=='') uploadPost()
        }}>
            <div>
                <label>
                    <h3>Title:</h3>
                    <input type='text' placeholder='Title' onChange={e => {
                        setTitle(e.target.value)
                    }}></input>
                </label>
                <label>
                    <h3>Message:</h3>
                    <textarea placeholder='Message' onChange={e => {
                        setMessage(e.target.value)
                    }}></textarea>
                </label>
            </div>
            <button type='submit'>Post!</button>
        </form>
    )
}