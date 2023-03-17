import { useEffect, useState } from "react"
import Navbar from "../../components/Shared/Navbar"
import axios from "axios"
import { useSearchParams } from "react-router-dom"
import styled from "styled-components"
import PostDataUser from "../../components/Feed/Post/PostDataUser"
import PostContent from "../../components/Feed/Post/PostContent"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import updateLocale from "dayjs/plugin/updateLocale"
import PostViewComm from "../../components/PostView/PostViewComm"
import PostAddComment from "../../components/Feed/Post/PostAddComment"
import PostComments from "../../components/Feed/Post/PostCommentsList"

const Container = styled.article`
    background-color: var(--color-secondary);
    width: 97%;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: auto;
    margin-left: auto;
    padding: 15px;
    border-radius: 10px;
    max-width: 500px;
`

const API_URL = process.env.REACT_APP_API_URL

export default function PostView() {
    const [post, setPost] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const id = searchParams.get("id")
    // const [usersLiked, setUsersLiked] = useState([])

    dayjs.extend(updateLocale)
    dayjs.updateLocale("en", {
        relativeTime: {
            future: "dans %s",
            past: "il y a %s",
            s: "quelques secondes",
            m: "1 minute",
            mm: "%d minutes",
            h: "1 heure",
            hh: "%d heures",
            d: "1 jour",
            dd: "%d jours",
            M: "1 mois",
            MM: "%d mois",
            y: "1 an",
            yy: "%d ans",
        },
    })
    dayjs.extend(relativeTime)
    useEffect(() => {
        async function getOnePost() {
            try {
                const res = await axios.get(API_URL + `/post/${id}`)
                console.log("ici", res)
                setPost(res.data)
                // setUsersLiked(res.data.usersLiked)
            } catch (err) {
                console.log(err)
            }
        }
        getOnePost()
    }, [id])
    console.log(post.usersLiked)
    return (
        <div>
            <Container>
                <PostDataUser post={post} setPost={setPost} />
                <PostContent post={post} setPost={setPost} />
                <p>{dayjs(post.dateAdd).fromNow()}</p>
                <PostViewComm post={post} setPost={setPost} />
            </Container>
            <PostAddComment post={post} setPost={setPost} />
            <PostComments post={post} />
            <Navbar />
        </div>
    )
}
