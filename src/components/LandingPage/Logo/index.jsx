import styled from "styled-components"
import LOGO from "../../../assets/icon-left-font-monochrome-black.svg"

const Image = styled.img`
    width: 250px;
    padding: 20px 20px;
`

export default function Logo() {
    return <Image src={LOGO} alt="Logo" />
}
