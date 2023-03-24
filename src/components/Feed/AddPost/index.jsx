import styled from "styled-components"
import SendButton from "../../Shared/SendButton"
import { React, useEffect, useRef, useState } from "react"
import IMAGE from "../../../assets/icons/image-solid.svg"
import axios from "axios"
import { API_URL } from "../../../utils/varibales/env_varibales"

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

export default function AddPost() {
    const [btnValue, setBtnValue] = useState("")
    const [content, setContent] = useState("")
    const fileInput = useRef()

    const handleContentChange = (e) => {
        setContent(e.target.value)
        console.log(content)
    }
    const fd = new FormData()
    const userId = localStorage.getItem("userId")
    const handleSubmit = (e) => {
        const post = {
            userId: userId,
            content: content,
        }
        fd.append("post", JSON.stringify(post))
        console.log(fd)
        console.log(post)
        axios
            .post(API_URL + "/post/", fd, {
                header: {
                    "content-type": "multipart/form-data",
                },
            })
            .then((response) => {
                console.log(response)
            })
    }
    const onFileAdded = (e) => {
        e.preventDefault()
        console.log(fileInput)
        const selectedFile = fileInput.current.files[0]
        console.log(selectedFile)
        fd.append("image", selectedFile)
    }

    useEffect(() => {
        setBtnValue("Publier")
    }, [btnValue])
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
                <IMG src={IMAGE} alt="icone d'une image" />
                <input
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={onFileAdded}
                    ref={fileInput}
                    name="image"
                />
            </DivFlex>
            <SendButton
                type="submit"
                btnValue={btnValue}
                setBtnValue={setBtnValue}
            />
        </Container>
    )
}
