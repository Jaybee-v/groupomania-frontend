import styled from "styled-components"
import SendButton from "../../Shared/SendButton"
import { useEffect, useState } from "react"
import IMAGE from "../../../assets/icons/image-solid.svg"
import axios from "axios"

const Container = styled.form`
    background-color: var(--color-secondary);
    width: 97%;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    margin-top: 3px;
    margin-right: auto;
    margin-left: auto;
    padding: 8px;
    border-radius: 10px;
    max-width: 500px;
`
const DivCol = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const DivFlex = styled.div`
    display: flex;
    padding: 2px 5px;
    align-items: center;
    margin: auto;
`

const Input = styled.input`
    padding: 5px 8px;
    width: 95%;
    border-radius: 10px;
    border: none;
`
const PostContent = styled.textarea`
    width: 98%;
    padding: 8px;
    border-radius: 10px;
    border: none;
`

const IMG = styled.img`
    margin-left: 5px;
    width: 25px;
    height: 25px;
    transition: 0.3s ease-in-out;
    cursor: pointer;
    &:hover {
        transform: scale(1.3);
    }
`

const API_URL = process.env.REACT_APP_API_URL

export default function AddPost() {
    const [btnValue, setBtnValue] = useState("")
    const [content, setContent] = useState([])

    const handleContentChange = (e) => setContent(e.target.value)

    const handleSubmit = (e) => {
        const post = {
            post: {
                userId: localStorage.getItem("userId"),
                content: content,
            },
        }
        axios.post(API_URL + "/post/", post).then((response) => {
            console.log(response)
        })
    }

    useEffect(() => {
        setBtnValue("Publier")
    })
    return (
        <Container onSubmit={handleSubmit}>
            <DivCol>
                <PostContent
                    placeholder="Que souhaitez vous publier?"
                    rows="5"
                    cols="33"
                    onChange={handleContentChange}
                ></PostContent>
            </DivCol>
            <DivFlex></DivFlex>
            <DivFlex>
                <IMG src={IMAGE} alt="iconde d'une image" />
                <Input type="file" accept="image/png, image/jpeg" />
            </DivFlex>
            <SendButton
                type="submit"
                btnValue={btnValue}
                setBtnValue={setBtnValue}
            />
        </Container>
    )
}
