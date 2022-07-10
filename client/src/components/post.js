// import React from "react"
import { useEffect, useRef, useState } from "react"
import { useQuery, useLazyQuery } from '@apollo/client'
import translatePost from "../queries/translatePost"
import findOne from '../queries/findOne'
// components
import DisplayPost from "./minor/displayPost"

export default function Post(props) {
    const { id } = props.match.params
    const [targetLanguage, setTargetLanguage] = useState('')
    const [postContent, setPostContent] = useState('loading')

    // queries
    const { data } = useQuery(findOne, {
        variables: { id }
    })
    const [translate, { data: translateData }] = useLazyQuery(translatePost, {
        skip: !data,
        variables: { title: data && data.findOne.title, message: data && data.findOne.message, target: targetLanguage }
    })

    // helper functions
    const generateDisplay = (title, message, author) => {
        return(
            <DisplayPost
                title={title}
                message={message}
                author={author}
            />
        )
    }

    const translator = (title, message) => {
        return(
            <form onSubmit={(e) => {
                e.preventDefault()
                translate()
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

    // useEffect
    const initialRef = useRef(true)
    useEffect(() => {
        if(initialRef.current){
            initialRef.current = false
        } else {
            setPostContent(generateDisplay(data.findOne.title, data.findOne.message, data.findOne.author))
        }
    }, [data])
    const translateRef = useRef(true)
    useEffect(() => {
        if(translateRef.current){
            translateRef.current = false
        } else {
            setPostContent(generateDisplay(translateData.translatePost.title, translateData.translatePost.message, data.findOne.author))
        }
    }, [translateData])

    return(
        <div>
            {postContent}
            {data ? translator(data.findOne.title, data.findOne.message) : ''}
        </div>
    )
}