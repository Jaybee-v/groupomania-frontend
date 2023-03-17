import styled from "styled-components"
import HOME from "../../../assets/icons/house-user-solid.svg"
import PROFILE from "../../../assets/icons/user-solid.svg"
import DECO from "../../../assets/icons/right-from-bracket-solid.svg"
import { useNavigate } from "react-router-dom"

const Nav = styled.nav`
    position: fixed;
    bottom: 0px;
    width: 100vw;
    background: #fff;
    padding: 5px;
`

const Div = styled.div`
    padding: 5px;
`

const List = styled.ul`
    display: flex;
    justify-content: space-around;
`

const ItemList = styled.li`
    cursor: pointer;
    &:hover {
        transform: scale(1.1);
    }
`

const IMG = styled.img`
    width: 25px;
    height: 25px;
`

export default function Navbar() {
    const userId = localStorage.getItem("userId")
    let navigate = useNavigate()
    const handleClickLogout = (e) => {
        localStorage.removeItem("token")
        localStorage.removeItem("userId")
        navigate("/")
    }
    const handleClickHome = (e) => {
        navigate("/home")
    }
    const handleClickProfile = (e) => {
        navigate(`/profile?user=${userId}`)
    }
    return (
        <Nav>
            <Div>
                <List>
                    <ItemList>
                        <IMG
                            src={HOME}
                            alt="Accueil"
                            onClick={handleClickHome}
                        />
                    </ItemList>
                    <ItemList>
                        <IMG
                            src={PROFILE}
                            alt="Profile"
                            onClick={handleClickProfile}
                        />
                    </ItemList>
                    <ItemList>
                        <IMG
                            src={DECO}
                            alt="Deconnexion"
                            onClick={handleClickLogout}
                        />
                    </ItemList>
                </List>
            </Div>
        </Nav>
    )
}
