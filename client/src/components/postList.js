import { Link } from 'react-router-dom'

export default function PostList(props) {
    const { data } = props
    console.log(data)
    return data.findAll.map(post => {
        return(
            <div>
                <Link to={`/post/${post._id}`}>
                    {post.title}
                </Link>
                <p>{post.message}</p>
                <p>{post.author}</p>
            </div>
        )
    })
}