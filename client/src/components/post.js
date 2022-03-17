import { useState } from "react"
import { useLazyQuery } from '@apollo/client'
import translatePost from '../queries/translatePost'
// components
import DisplayPost from "./minor/displayPost"

export default function Post(props) {
    const { title, message, author } = props
    const [uploadPost, { data }] = useLazyQuery(translatePost, {
        variables: { post: {title, message , author: "NYI"} }
    })
    // variables
    const [targetLanguage, setTargetLanguage] = useState()
    const [postContent, setPostContent] = useState(DisplayPost(title, message, author))

    const translator = () => {
        return(
            <form onSubmit={(e) => {
                e.preventDefault()
                setPostContent()
            }}>
                <label for="targetLanguage">
                    Target Language:
                </label>
                <input id="targetLanguage" value={targetLanguage} onChange={(e) => {
                    setTargetLanguage(e.target.value)
                }} placeholder="target language ie. en (english)"></input>
            </form>
        )
    }

    return(
        <div>
            {postContent ? postContent : 'err'}
            {translator}
        </div>
    )
}