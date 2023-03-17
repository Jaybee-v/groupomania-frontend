import styled from "styled-components"
import { TrashIcon } from "../../../Shared/Icons/TrashIcon"
import { EditIcon } from "../../../Shared/Icons/EditIcon"
import axios from "axios"
import { EditContext } from "../../../../utils/context"
import { useContext } from "react"
import { API_URL } from "../../../../utils/varibales/env_varibales"

const Container = styled.div`
    display: flex;
    z-index: 999;
    margin-bottom: -40px;
`

const Div = styled.div`
    display: flex;
    width: 80px;
    justify-content: space-evenly;
`

const Actions = styled.div`
    width: 15px;
`

export default function PostSettings({ post, setPosts, toggleClick }) {
    const token = localStorage.getItem("token")
    const { toggleEdit } = useContext(EditContext)

    function handleDeleteClick(e) {
        axios
            .delete(API_URL + `/post/${post._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log(response)
                setPosts((prevPosts) =>
                    prevPosts.filter((p) => p._id !== post._id)
                )
            })
            .catch((err) => console.log(err))
    }
    return (
        <Container>
            <Div>
                <Actions onClick={toggleClick}>
                    <EditIcon />
                </Actions>
                <Actions onClick={handleDeleteClick}>
                    <TrashIcon />
                </Actions>
            </Div>
        </Container>
    )
}
