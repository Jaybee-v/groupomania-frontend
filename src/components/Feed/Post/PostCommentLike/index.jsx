import styled from "styled-components"
import { userId, API_URL } from "../../../../utils/varibales/env_varibales"
import { useState } from "react"
import axios from "axios"
import { HeartRegularIcon } from "../../../Shared/Icons/HeartRegularIcon"
import { HeartSolidIcon } from "../../../Shared/Icons/HeartSolidIcon"

const Container = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
`
const Div = styled.div`
    display: flex;
`

export default function PostCommentLike({ comment }) {
    const [like, setLike] = useState(comment.likes)
    const [likeActive, setLikeActive] = useState(
        comment.usersLiked.includes(userId)
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
        if (comment.usersLiked.includes(userId)) {
            axios.put(API_URL + `/comment/like/${comment._id}`, removeLike)
        } else {
            axios.put(API_URL + `/comment/like/${comment._id}`, addLike)
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
        </Container>
    )
}
