import { useEffect, useState } from "react"
import { EditIcon } from "../../../Shared/Icons/EditIcon"
import styled from "styled-components"
import axios from "axios"

const Form = styled.form`
    display: flex;
    align-items: center;
`

const Input = styled.input`
    width: 80%;
    margin-right: 5px;
    padding: 10px 10px 10px 5px;
    border-radius: 10px;
    border: none;
`

const Btn = styled.button`
    border: none;
    background-color: var(--color-primary);
    padding: 2px;
    border-radius: 5px;
`

const API_URL = process.env.REACT_APP_API_URL

export default function PostEditContent({ posts, post, setEdit, setPosts }) {
    const userId = localStorage.getItem("userId")
    const [value, setValue] = useState("")

    const handleChange = (e) => {
        setValue(e.target.value)
    }
    const handleSubmit = () => {
        const data = {
            content: value,
            userId: userId,
        }
        axios.put(API_URL + `/post/${post._id}`, data).then((res) => {
            console.log(res)
            if (res.status === 200) {
                setEdit("content")
                setPosts(posts)
            }
        })
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Input type="text" onChange={handleChange} />
            <Btn type="submit" style={{ width: "18px" }}>
                <EditIcon fill={"var(--color-secondary)"} />
            </Btn>
        </Form>
    )
}
