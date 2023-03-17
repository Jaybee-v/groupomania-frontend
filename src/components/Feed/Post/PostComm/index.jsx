import styled from "styled-components"
import { HeartRegularIcon } from "../../../Shared/Icons/HeartRegularIcon"
import { CommentsIcon } from "../../../Shared/Icons/CommentsIcon"
import { HeartSolidIcon } from "../../../Shared/Icons/HeartSolidIcon"
import axios from "axios"

const API_URL = process.env.REACT_APP_API_URL

const Container = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
`
const Div = styled.div`
    display: flex;
`

export default function PostComm({ post, setPosts }) {
    const userId = localStorage.getItem("userId")

    const handleClick = (e) => {
        e.preventDefault()
        console.log(e.target)
        const addLike = {
            like: 1,
            userId: userId,
        }
        const removeLike = {
            like: 0,
            userId: userId,
        }
        if (post.usersLiked.includes(userId)) {
            axios
                .put(API_URL + `/post/like/${post._id}`, removeLike)
                .then((response) =>
                    setPosts((prevPosts) =>
                        prevPosts.filter((p) => p._id !== post._id)
                    )
                )
        } else {
            axios
                .put(API_URL + `/post/like/${post._id}`, addLike)
                .then((response) =>
                    setPosts((prevPosts) =>
                        prevPosts.filter((p) => p._id !== post._id)
                    )
                )
        }
    }

    return (
        <Container>
            <Div>
                <div
                    style={{ width: "20px", marginRight: "8px" }}
                    onClick={handleClick}
                >
                    {post && post.usersLiked.includes(userId) ? (
                        <HeartSolidIcon fill={"var(--color-primary)"} />
                    ) : (
                        <HeartRegularIcon />
                    )}
                </div>
                {post && post.usersLiked.includes(userId) ? (
                    <b>
                        <p>{post.likes}</p>
                    </b>
                ) : (
                    <p>{post.likes}</p>
                )}
            </Div>
            <Div
                onClick={(e) => {
                    document.location.href = `/post?id=${post._id}`
                }}
            >
                <div style={{ width: "20px", marginRight: "8px" }}>
                    <CommentsIcon />
                </div>
                <p>{post.commentsNumber}</p>
            </Div>
        </Container>
    )
}
