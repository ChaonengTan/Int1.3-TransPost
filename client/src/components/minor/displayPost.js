export default function DisplayPost(props) {
    const { title, message, author } = props
    return(
        <div>
            <h1>{title}</h1>
            <p>{message}</p>
            <p>{author}</p>
        </div>
    )
}