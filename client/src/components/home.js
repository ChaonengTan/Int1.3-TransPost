import { useQuery } from '@apollo/client'
// components
import CreatePost from './createPost'
import PostList from './postList'
import findAll from '../queries/findAll'

export default function Home() {
    const { loading, data } = useQuery(findAll)
    return(
        <div>
            <CreatePost/>
            { data ? <PostList data={data.reverse()}/> : "Loading" }
        </div>
    )
}