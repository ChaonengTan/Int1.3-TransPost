import { useState, useEffect, useRef } from "react"
import { useMutation } from "@apollo/client"
import createUser from '../queries/createUser'

export default function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [addUser, { data }] = useMutation(createUser, {
        variables: { username, password }
    })
    const dataRef = useRef(data)
    useEffect(() => {
        if (data !== dataRef.current) {
            sessionStorage.setItem('user', JSON.stringify(data.createUser))
            window.location.reload(false)
        }
    }, [data, dataRef])
    return(
        <form onSubmit={e => {
            e.preventDefault()
            addUser()
        }}>
            <h3>Register</h3>
            <div>
                <div>
                    <label>
                        <p>Username:</p>
                        <input placeholder='username' onChange={e => {
                            setUsername(e.target.value)
                        }}></input>
                    </label>
                    <label>
                        <p>Password:</p>
                        <input placeholder='password' onChange={e => {
                            setPassword(e.target.value)
                        }}></input>
                    </label>
                </div>
                <button type='submit'>Create User</button>
            </div>
        </form>
    )
}