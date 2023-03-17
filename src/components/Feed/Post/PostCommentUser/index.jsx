import styled from "styled-components"
import axios from "axios"
import { useEffect, useState } from "react"
import { API_URL } from "../../../../utils/varibales/env_varibales"

const Div = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 5px 0 5px 5px;
`

export default function PostCommentUser({ comment }) {
    const [user, setUser] = useState([])

    useEffect(() => {
        async function getUser() {
            try {
                const res = await axios.get(API_URL + `/user/${comment.userId}`)
                console.log(res)
                setUser(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getUser()
    }, [comment])

    return (
        <Div>
            <p>
                {user.name} {user.lastName}
            </p>
        </Div>
    )
}
