import styled from "styled-components"
import SendButton from "../../Shared/SendButton"
import axios from "axios"
import { API_URL, userId } from "../../../utils/varibales/env_varibales"
import { useNavigate } from "react-router-dom"

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

export default function DeleteProfileButton() {
    let navigate = useNavigate()
    const handleClick = () => {
        console.log("je fais la req")
        axios.delete(API_URL + `/user/${userId}`)
        navigate("/")
    }
    return (
        <Container>
            <h4>Vous souhaitez efffacer votre compte définitivement?</h4>
            <div onClick={handleClick}>
                <SendButton btnValue={"EFFACER"} />
            </div>
        </Container>
    )
}
