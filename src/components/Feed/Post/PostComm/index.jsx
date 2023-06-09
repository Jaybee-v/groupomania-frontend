import styled from "styled-components"
import { HeartRegularIcon } from "../../../Shared/Icons/HeartRegularIcon"
import { CommentsIcon } from "../../../Shared/Icons/CommentsIcon"
import { HeartSolidIcon } from "../../../Shared/Icons/HeartSolidIcon"
import axios from "axios"
import { useState } from "react"

const API_URL = process.env.REACT_APP_API_URL

const Container = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
`
const Div = styled.div`
    display: flex;
`

export default function PostComm({ post, commNbr, posts }) {
    const userId = localStorage.getItem("userId")
    const [like, setLike] = useState(post.likes)
    const [likeActive, setLikeActive] = useState(
        post.usersLiked.includes(userId)
    )

    const handleClick = () => {
        if (likeActive) {
            setLikeActive(false)
            setLike(like - 1)
        } else {
            setLikeActive(true)
            setLike(like + 1)
        }
        const addLike = {
            like: 1,
            userId: userId,
        }
        const removeLike = {
            like: 0,
            userId: userId,
        }
        if (post.usersLiked.includes(userId)) {
            axios.put(API_URL + `/post/like/${post._id}`, removeLike)
        } else {
            axios.put(API_URL + `/post/like/${post._id}`, addLike)
        }
    }

    return (
        <Container>
            <Div>
                <div
                    style={{ width: "20px", marginRight: "8px" }}
                    onClick={handleClick}
                >
                    {likeActive ? (
                        <HeartSolidIcon fill={"var(--color-primary)"} />
                    ) : (
                        <HeartRegularIcon />
                    )}
                </div>
                {likeActive ? (
                    <b>
                        <p>{like}</p>
                    </b>
                ) : (
                    <p>{like}</p>
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
                <p>{commNbr.length}</p>
            </Div>
        </Container>
    )
}
