// import React from "react"
import { useState } from "react"
import { useLazyQuery, useQuery } from '@apollo/client'
import translatePost from '../queries/translatePost'
import findOne from '../queries/findOne'
// components
import DisplayPost from "./minor/displayPost"

export default function Post(props) {
    const { id } = props.match.params
    const { data } = useQuery(findOne, {
        variables: { id }
    })
    const [targetLanguage, setTargetLanguage] = useState('')
    const [postContent, setPostContent] = useState()
    // query
    // const [translate, { data: translateData }] = useLazyQuery(translatePost, {
    //     variables: { title: data.findOne.title, message: data.findOne.message, target: targetLanguage }
    // })
    const generateDisplay = (title, message, author) => {
        return(
            <DisplayPost
                title={title}
                message={message}
                author={author}
            />
        )
    }

    const translator = () => {
        return(
            <form onSubmit={(e) => {
                e.preventDefault()
                // translate()
            }}>
                <label>
                    <p>Target Language:</p>
                    <input value={targetLanguage} onChange={(e) => {
                    setTargetLanguage(e.target.value)
                    }} placeholder="target language ie. en (english)"></input>
                </label>
                <button type="submit">Submit</button>
            </form>
        )
    }

    return(
        <div>
            {data ? generateDisplay(data.findOne.title, data.findOne.message, data.findOne.author) : 'Loading'}
            {/* {data && translator() } */}
        </div>
    )
}