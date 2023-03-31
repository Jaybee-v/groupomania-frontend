import styled from "styled-components"

const Container = styled.div``

const List = styled.ul`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: center;
    width: fat-content;
    margin: auto;
    background-color: #fff;
    border-radius: 20px 20px 0 0;
`

export default function Menu({ choice, setChoice }) {
    const handleToggleMenu = (e) => {
        e.preventDefault()
        const target = e.target
        const splitTarget = target.className.split(" ")

        if (splitTarget.includes("active")) {
            target.classList.add("active")
        }
    }

    return (
        <Container>
            <List>
                <li
                    id="signin"
                    className={
                        choice === "signin" ? "itemList active" : "itemList"
                    }
                    onClick={() => {
                        setChoice("signin")
                        handleToggleMenu()
                    }}
                >
                    Se connecter
                </li>
                <li
                    id="signup"
                    className={
                        choice === "signup" ? "itemList active" : "itemList"
                    }
                    onClick={() => {
                        setChoice("signup")
                        handleToggleMenu()
                    }}
                >
                    S'inscrire
                </li>
            </List>
        </Container>
    )
}
