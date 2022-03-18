import { useState, useEffect, useRef } from "react"
import { useLazyQuery } from "@apollo/client"
import verifyUser from '../queries/verifyUser'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [checkLogin, { data }] = useLazyQuery(verifyUser, {
        variables: { username, password }
    })
    const dataRef = useRef(data)
    useEffect(() => {
        if (data !== dataRef.current) {
            sessionStorage.setItem('user', JSON.stringify(data.verifyUser))
            console.log(JSON.parse(sessionStorage.getItem('user')))
        }
    }, [data, dataRef])
    return(
        <form onSubmit={e => {
            e.preventDefault()
            checkLogin()
        }}>
            <h3>Login</h3>
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
                <button type='submit'>Login</button>
            </div>
        </form>
    )
}