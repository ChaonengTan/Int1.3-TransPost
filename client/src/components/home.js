import { Link } from 'react-router-dom'

export default function Home(props) {
    const { data } = props
    const posts = data.map(post => {
        return(
            <div>
                this is a post
                <Link to={`/post/${post._id}`}>
                    {post.title}
                </Link>
                <p>{post.message}</p>
                <p>{post.author}</p>
            </div>
        )
    })
    return(
        <div>
            this is the home page
            {posts}
        </div>
    )
}