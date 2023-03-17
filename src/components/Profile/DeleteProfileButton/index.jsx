import styled from "styled-components"
import SendButton from "../../Shared/SendButton"

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
    return (
        <Container>
            <h4>Vous souhaitez efffacer votre compte définitivement?</h4>
            <SendButton btnValue={"EFFACER"} />
        </Container>
    )
}
