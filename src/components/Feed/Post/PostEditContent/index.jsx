import { useEffect, useState } from "react"
import styled from "styled-components"
import axios from "axios"

const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
`

const Input = styled.input`
    width: 100%;
    overflow: visible;
    height: fit-content;
    margin: 15px 0;
    background-color: #fff;
    padding: 10px 10px 10px 5px;
    border-radius: 10px;
    border: none;
`

const API_URL = process.env.REACT_APP_API_URL

export default function PostEditContent({ posts, post, setEdit, setPosts }) {
    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("userId")
    const [value, setValue] = useState(post.content)

    const handleChange = (e) => {
        setValue(e.target.value)
    }
    const handleSubmit = () => {
        const data = {
            content: value,
            userId: userId,
        }
        axios
            .put(API_URL + `/post/${post._id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    setEdit("content")
                    setPosts(posts)
                }
            })
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Input type="text" value={value} onChange={handleChange} />
        </Form>
    )
}
