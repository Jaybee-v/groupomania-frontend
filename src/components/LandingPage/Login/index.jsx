import styled from "styled-components"
import SendButton from "../../Shared/SendButton"
import { useEffect, useState } from "react"
import axios from "axios"
import { authService } from "../../../services/auth.service"
import { useNavigate } from "react-router-dom"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    padding: 15px;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
`

const Input = styled.input`
    margin-top: 10px;
    padding: 5px;
`

const API_URL = process.env.REACT_APP_API_URL

export default function Login() {
    let navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

    const handleEmailChange = (e) => setEmail(e.target.value)

    const handlePasswordChange = (e) => setPassword(e.target.value)

    const handleClick = async (e) => {
        e.preventDefault()
        const user = {
            email: email,
            password: password,
        }
        await axios.post(API_URL + "/user/signin", user).then((response) => {
            console.log("REPONSE", response)
            switch (response.status) {
                case 200:
                    authService.saveToken(response.data)
                    navigate("/home")
                    break
                case 401:
                    setErrorMsg("")
                    setErrorMsg("Mot de passe ou email incorrect...")
                    break
                default:
                    setErrorMsg("")
                    break
            }
        })
    }

    return (
        <Container>
            <Form onSubmit={handleClick}>
                <Input
                    type="text"
                    placeholder="Email"
                    onChange={handleEmailChange}
                />
                <Input
                    type="password"
                    placeholder="Mot de passe"
                    onChange={handlePasswordChange}
                />
                <SendButton type="submit" btnValue={"Se connecter"} />
            </Form>
            {errorMsg !== "" ? <div>{errorMsg}</div> : null}
        </Container>
    )
}
