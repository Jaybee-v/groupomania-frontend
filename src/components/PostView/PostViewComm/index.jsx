import styled from "styled-components"
import { HeartSolidIcon } from "../../Shared/Icons/HeartSolidIcon"
import { HeartRegularIcon } from "../../Shared/Icons/HeartRegularIcon"
import { CommentsIcon } from "../../Shared/Icons/CommentsIcon"
import axios from "axios"

const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-top: 10px;
`

const Div = styled.div`
    display: flex;
`

const API_URL = process.env.REACT_APP_API_URL

export default function PostViewComm({ post, setPost }) {
    const userId = localStorage.getItem("userId")
    const handleClick = (e) => {
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
            axios.put(API_URL + `/post/like/${post._id}`, removeLike)
        } else {
            axios.put(API_URL + `/post/like/${post._id}`, addLike)
        }
        document.location.reload()
    }

    const usersLiked = post.usersLiked
    console.log("usersLiked", usersLiked)
    console.log("PVC", post)
    return (
        <Container>
            <Div>
                <Div
                    style={{ width: "20px", marginRight: "8px" }}
                    onClick={handleClick}
                >
                    {usersLiked && usersLiked.includes(userId) ? (
                        <HeartSolidIcon fill={"var(--color-primary)"} />
                    ) : (
                        <HeartRegularIcon />
                    )}
                </Div>
                {usersLiked && usersLiked.includes(userId) ? (
                    <b>
                        <p>{post.likes}</p>
                    </b>
                ) : (
                    <p>{post.likes}</p>
                )}
            </Div>
            <Div style={{ margingLeft: " 150px" }}>
                <Div style={{ width: "20px", marginRight: "8px" }}>
                    <CommentsIcon />
                </Div>
                <p>{post.commentsNumber}</p>
            </Div>
        </Container>
    )
}
