import { useQuery } from '@apollo/client'
// components
import CreatePost from './createPost'
import PostList from './postList'
import findAll from '../queries/findAll'
import Login from './login'
export default function Home() {
    const user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user'))._id : false
    const { data } = useQuery(findAll, {
        pollInterval: 3000
    })
    return(
        <div>
            { user ? <CreatePost/> : <Login/> }
            { data ? <PostList data={data}/> : "Loading" }
        </div>
    )
}