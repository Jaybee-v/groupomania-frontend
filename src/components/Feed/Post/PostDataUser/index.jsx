import axios from "axios"
import { useEffect, useState } from "react"
import styled from "styled-components"
import PostSettings from "../PostSettings"

const API_URL = process.env.REACT_APP_API_URL

const Div = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 5px 0 5px 5px;
`

export default function PostDataUser({
    post,
    setPosts,
    status,
    setStatus,
    toggleClick,
}) {
    const [user, setUser] = useState([])
    const userId = localStorage.getItem("userId")

    useEffect(() => {
        async function getUser() {
            try {
                const res = await axios.get(API_URL + `/user/${post.userId}`)
                console.log(res)
                setUser(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getUser()
    }, [post])

    return (
        <Div>
            <p>
                {user.name} {user.lastName}
            </p>
            {userId === post.userId ? (
                <PostSettings
                    post={post}
                    setPosts={setPosts}
                    user={user}
                    status={status}
                    setStatus={setStatus}
                    toggleClick={toggleClick}
                />
            ) : null}
        </Div>
    )
}
