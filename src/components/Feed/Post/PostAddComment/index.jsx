import styled from "styled-components"
import SendButton from "../../../Shared/SendButton"
import { useEffect, useState } from "react"
import axios from "axios"
import { API_URL, userId } from "../../../../utils/varibales/env_varibales"

const Container = styled.section`
    background-color: var(--color-secondary);
    width: 97%;
    max-width: 500px;
    margin: auto;
    padding: 5px;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 5px;
`
const TextArea = styled.textarea`
    padding: 5px;
    margin: auto;
    width: 98%;
    border: none;
`

export default function PostAddComment({ post, setPost }) {
    const [btnValue, setBtnValue] = useState("")
    const [commentContent, setCommentContent] = useState("")

    useEffect(() => {
        setBtnValue("Publier")
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const comment = {
            comment: {
                userId: userId,
                postId: post._id,
                content: commentContent,
            },
        }
        axios.post(API_URL + `/comment/`, comment)
        document.location.reload()
    }
    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <TextArea
                    placeholder="Ecrivez votre commentaire..."
                    onChange={(e) => setCommentContent(e.target.value)}
                />
                <SendButton
                    type="submit"
                    btnValue={btnValue}
                    setBtnValue={setBtnValue}
                />
            </Form>
        </Container>
    )
}
