import axios from "axios"
import { useEffect, useState } from "react"
import styled from "styled-components"
import PostSettings from "../PostSettings"
import { API_URL, userId } from "../../../../utils/varibales/env_varibales"

const Div = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 5px 0 5px 5px;
`

const Avatar = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
`

export default function PostDataUser({ post, posts, status, toggleClick }) {
    const [user, setUser] = useState([])
    const [isAvatar, setIsAvatar] = useState(false)
    const [avatar, setAvatar] = useState([])
    const [role, setRole] = useState(localStorage.getItem("role"))

    console.log("POST", post)
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
    useEffect(() => {
        const getAvatar = async () => {
            try {
                const res = await axios.get(API_URL + `/avatar/${user._id}`)
                if (res.data === null) {
                    setIsAvatar(false)
                } else {
                    setIsAvatar(true)
                    setAvatar(res.data)
                }
                console.log("avatar", res)
            } catch (err) {
                console.log(err)
            }
        }
        getAvatar()
    }, [user])
    return (
        <Div>
            {isAvatar ? (
                <span>
                    <Avatar src={avatar.imageUrl} alt="avatar" />
                </span>
            ) : null}
            {user && (
                <p>
                    {user.name} {user.lastName}
                </p>
            )}

            {userId === post.userId || role === "admin" ? (
                <PostSettings
                    posts={posts}
                    post={post}
                    user={user}
                    status={status}
                    toggleClick={toggleClick}
                />
            ) : null}
        </Div>
    )
}
