import styled from "styled-components"
import SendButton from "../SendButton"
import CancelButton from "../CancelButton"

const Page = styled.section`
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    position: absolute;
    background-color: #27272799;
`

const ModalDiv = styled.div`
    padding: 30px 20px;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 150px;
    background-color: #fff;
`

const BtnContainer = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-evenly;
`

const Modal = ({ question, valid, setModalOpen, modalOpen }) => {
    const handleCancel = () => {
        setModalOpen(false)
    }
    return (
        <>
            {modalOpen ? (
                <Page>
                    <ModalDiv>
                        <h6>{question}</h6>
                        <BtnContainer>
                            <div onClick={handleCancel}>
                                <CancelButton btnValue={"Annuler"} />
                            </div>
                            <div onClick={valid}>
                                <SendButton btnValue={"Effacer"} />
                            </div>
                        </BtnContainer>
                    </ModalDiv>
                </Page>
            ) : null}
        </>
    )
}

export default Modal
