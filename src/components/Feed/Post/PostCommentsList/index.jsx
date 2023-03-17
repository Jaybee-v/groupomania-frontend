import axios from "axios"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { API_URL } from "../../../../utils/varibales/env_varibales"
import PostComment from "../PostComment"
import PostAddComment from "../PostAddComment"

const DivAdd = styled.div`
    display: flex;
    flex-direction: column-reverse;
    margin: 0px 0;
`

const Div = styled.div`
    display: flex;
    flex-direction: column-reverse;
    margin: 0px 0;
    > * {
        &:first-child {
            margin-bottom: 50px !important;
        }
    }
`

export default function PostCommentsList({ post }) {
    const [comments, setComments] = useState([])
    const id = post._id

    useEffect(() => {
        async function getComments() {
            try {
                const res = await axios.get(API_URL + `/comment/${id}`)
                console.log("les comments=", res)
                setComments(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getComments()
    }, [id])

    return (
        <>
            <DivAdd>
                <PostAddComment post={post} />
            </DivAdd>
            <Div>
                {comments
                    ? comments.map((comment, index) => (
                          <PostComment
                              comment={comment}
                              key={`${comment._id}-${index}`}
                          />
                      ))
                    : null}
            </Div>
        </>
    )
}
