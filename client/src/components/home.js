import { useQuery } from '@apollo/client'
// components
import CreatePost from './createPost'
import PostList from './postList'
import findAll from '../queries/findAll'
import Login from './login'
import Register from './register'
export default function Home() {
    const user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user'))._id : false
    const { data } = useQuery(findAll, {
        pollInterval: 3000
    })
    const loginRegister = () => {
        return(
            <div>
                <Login/>
                <Register/>
            </div>
        )
    }
    return(
        <div>
            { user ? <CreatePost/> : loginRegister() }
            { data ? <PostList data={data}/> : "Loading" }
        </div>
    )
}