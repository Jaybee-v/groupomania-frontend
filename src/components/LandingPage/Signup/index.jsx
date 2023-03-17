import axios from "axios"
import { useEffect, useState } from "react"
import styled from "styled-components"
import SendButton from "../../Shared/SendButton"

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

export default function Signup() {
    const [btnValue, setBtnValue] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [status, setStatus] = useState("")

    const handleEmailChange = (e) => setEmail(e.target.value)

    const handlePasswordChange = (e) => setPassword(e.target.value)

    const handleNameChange = (e) => setName(e.target.value)
    const handleLastNameChange = (e) => setLastName(e.target.value)

    const handleSubmit = (e) => {
        e.preventDefault()
        const user = {
            email: email,
            password: password,
            name: name,
            lastName: lastName,
        }
        axios.post(API_URL + "/user/signup", user).then((response) => {
            console.log(response)
            switch (response.status) {
                case 201:
                    setStatus("Vous venez de créer un compte. Bienvenue!")
                    break
                case 400:
                    setStatus("")
                    setStatus(
                        "Erreur dans votre saisie. Vérifiez que vous avez rempli tous les champs."
                    )
                    break
                default:
                    setStatus("")
                    break
            }
        })
    }
    useEffect(() => {
        setBtnValue("S'inscrire")
    })
    return (
        <Container>
            <Form onClick={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Adresse email"
                    onChange={handleEmailChange}
                    required
                />
                <Input
                    type="password"
                    placeholder="Choisissez un mot de passe"
                    onChange={handlePasswordChange}
                    required
                />
                <Input
                    type="text"
                    placeholder="Prénom"
                    onChange={handleNameChange}
                    required
                />
                <Input
                    type="text"
                    placeholder="Nom de famille"
                    onChange={handleLastNameChange}
                    required
                />
                <SendButton btnValue={btnValue} setBtnValue={setBtnValue} />
            </Form>

            {status !== "" ? <div>{status}</div> : null}
        </Container>
    )
}
