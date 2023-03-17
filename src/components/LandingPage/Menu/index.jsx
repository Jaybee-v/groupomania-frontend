import { useEffect, useState } from "react"
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

const ItemList = styled.li`
    padding: 15px 15px;
    font-weight: 600;
    font-size: 0.9rem;
    background-color: #cccccc98;
    color: #fff;
    &:first-child {
        border-radius: 20px 0 0 0;
    }
    &:last-child {
        border-radius: 0 20px 0 0;
    }
    &.active {
        color: var(--color-primary);
        border: none;
        background-color: #fff !important;
    }
`

export default function Menu({ state, setState }) {
    const btnSignin = document.getElementById("signin")
    const btnSignup = document.getElementById("signup")
    const handleClickConnect = (e) => {
        e.preventDefault()
        // e.target.classList.add("active")

        // btnSignup.classList.remove("active")

        setState("connect")
    }
    const handleClickSignup = (e) => {
        e.preventDefault()

        // btnSignin.classList.remove("active")

        // e.target.classList.add("active")
        setState("signup")
    }
    return (
        <Container>
            <List>
                <ItemList
                    id="signin"
                    className="active"
                    onClick={handleClickConnect}
                >
                    Se connecter
                </ItemList>
                <ItemList id="signup" onClick={handleClickSignup}>
                    S'inscrire
                </ItemList>
            </List>
        </Container>
    )
}
