import styled from "styled-components"

const Container = styled.section`
    background-color: #fff;
    width: 95%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`
const Round = styled.div`
    width: 90px;
    height: 90px;
    background-color: blue;
    border-radius: 50%;
`
const Div = styled.div``

export default function ProfileCard({ user }) {
    return (
        <Container>
            <Round />
            <Div>
                <p>
                    {user.name}
                    {" " + user.lastName}
                </p>
                {/* NOMBRE DE POST  */}
                {/* DATE INSCRIPTION */}
            </Div>
        </Container>
    )
}
