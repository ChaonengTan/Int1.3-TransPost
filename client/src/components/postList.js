import { Link } from 'react-router-dom'
import './styles/postList.css'

export default function PostList(props) {
    const { data } = props
    const reverseData = [...data.findAll].reverse()
    const postList = reverseData.map(post => {
        return(
            <div key={post._id}>
                <Link to={`/post/${post._id}`}>
                    {post.title}
                </Link>
                <p>{post.message}</p>
                <p>{post.author}</p>
            </div>
        )
    })
    return (
        <div className='postList'>
            {postList}
        </div>
    )
}