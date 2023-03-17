import { useEffect, useState } from "react"
import axios from "axios"
import AddPost from "../../components/Feed/AddPost"
import Navbar from "../../components/Shared/Navbar"
import "../../utils/style/index.css"
import Post from "../../components/Feed/Post"
import styled from "styled-components"

const API_URL = process.env.REACT_APP_API_URL

const Div = styled.div`
    display: flex;
    flex-direction: column-reverse;
    > * {
        &:first-child {
            margin-bottom: 50px !important;
        }
    }
`

export default function Feed() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        async function getPosts() {
            const res = await axios.get(API_URL + "/post/")
            console.log(res)
            setPosts(res.data)
        }
        getPosts()
    }, [])
    return (
        <>
            <AddPost />
            <Div>
                {posts.map((post, index) => (
                    <Post
                        post={post}
                        posts={posts}
                        index={index}
                        setPosts={setPosts}
                        key={`${post.id}-${index}`}
                    />
                ))}
            </Div>
            <Navbar />
        </>
    )
}
