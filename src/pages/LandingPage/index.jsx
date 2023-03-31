import styled from "styled-components"
import Login from "../../components/LandingPage/Login"
import Menu from "../../components/LandingPage/Menu"
import Logo from "../../components/LandingPage/Logo"
import { useState } from "react"
import Signup from "../../components/LandingPage/Signup"

const Container = styled.div`
    background-color: var(--color-secondary);
    width: 300px;
    padding: 10px 20px;
    border-radius: 15px;
    margin: auto;
    margin-top: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

function LandingPage() {
    const [choice, setChoice] = useState("signin")
    return (
        <Container>
            <Logo />
            <Menu choice={choice} setChoice={setChoice} />
            {choice === "signup" ? <Signup /> : <Login />}
        </Container>
    )
}

export default LandingPage
