import { useState } from "react"

export default function Post(props) {
    const { title, message, author } = props

    const [targetLanguage, setTargetLanguage] = useState()
    const [postContent, setPostContent] = useState(displayPost(title, message, author))

    const translator = () => {
        return(
            <form onSubmit={(e) => {
                e.preventDefault()
                setPostContent()
            }}>
                <label for="targetLanguage">
                    Target Language:
                </label>
                <input id="targetLanguage"onChange={(e) => {
                    setTargetLanguage(e.target.value)
                }} placeholder="target language ie. en (english)"></input>
            </form>
        )
    }

    const displayPost = (title, message, author) => {
        return(
            <div>
                <h1>{title}</h1>
                <p>{message}</p>
                <p>{author}</p>
            </div>
        )
    }
    return(
        <div>
            
            {translator}
        </div>
    )
}