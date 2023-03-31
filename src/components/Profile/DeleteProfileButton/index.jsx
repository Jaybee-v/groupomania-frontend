import styled from "styled-components"
import SendButton from "../../Shared/SendButton"
import axios from "axios"
import { API_URL, userId } from "../../../utils/varibales/env_varibales"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import Modal from "../../Shared/Modal"

const Container = styled.section`
    background-color: #fff;
    width: 95%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
`

export default function DeleteProfileButton({ user }) {
    let navigate = useNavigate()
    const [modalOpen, setModalOpen] = useState(false)
    const handleClickValid = () => {
        console.log("je fais la req")
        axios.delete(API_URL + `/user/${user._id}`)
        navigate("/")
    }

    const handleClick = () => {
        setModalOpen(true)
    }

    return (
        <Container>
            <h4>Vous souhaitez efffacer votre compte définitivement?</h4>
            <div onClick={handleClick}>
                <SendButton btnValue={"EFFACER"} />
            </div>
            {modalOpen ? (
                <Modal
                    question={
                        "Êtes vous certain de vouloir supprimer votre compte?"
                    }
                    valid={handleClickValid}
                    setModalOpen={setModalOpen}
                    modalOpen={modalOpen}
                />
            ) : null}
        </Container>
    )
}
