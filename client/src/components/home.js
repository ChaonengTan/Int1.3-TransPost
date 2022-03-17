import { useQuery } from '@apollo/client'
// components
import CreatePost from './createPost'
import PostList from './postList'
import findAll from '../queries/findAll'

export default function Home() {
    const { data } = useQuery(findAll, {
        pollInterval: 3000
    })
    return(
        <div>
            <CreatePost/>
            { data ? <PostList data={data}/> : "Loading" }
        </div>
    )
}