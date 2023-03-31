import styled from "styled-components"

const Button = styled.button`
    padding: 8px 15px;
    border: 1px solid var(--color-primary);
    font-weight: 800;
    letter-spacing: 1px;
    color: var(--color-primary);
    background-color: var(--color-secondary);
    width: fit-content;
    margin-right: auto;
    margin-left: auto;
    margin-top: 5px;
    border-radius: 10px;
    transition: 0.3s ease-in-out;
    cursor: pointer;
    &:hover {
        background-color: var(--color-secondary);
        color: var(--color-primary);
        box-shadow: 2px 2px 5px var(--color-third),
            -2px -2px 5px var(--color-third);
    }
`

export default function CancelButton({ btnValue, setBtnValue }) {
    return <Button>{btnValue}</Button>
}
