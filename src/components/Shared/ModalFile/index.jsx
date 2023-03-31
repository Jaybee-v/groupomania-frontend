import React, { useRef } from "react"
import styled from "styled-components"
import SendButton from "../SendButton"
import CancelButton from "../CancelButton"
import axios from "axios"
import { API_URL } from "../../../utils/varibales/env_varibales"

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

export default function ModalFile({
    question,
    valid,
    setModalEditOpen,
    modalEditOpen,
    avatar,
}) {
    const fd = new FormData()
    const token = localStorage.getItem("token")
    const fileInput = useRef()
    const onFileAdded = (e) => {
        e.preventDefault()
        console.log(fileInput)
        const selectedFile = fileInput.current.files[0]
        console.log(selectedFile)
        fd.append("image", selectedFile)
    }
    const handleUpdateAvatar = (e) => {
        axios
            .put(API_URL + `/avatar/${avatar._id}`, fd, {
                headers: {
                    "content-type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log(response)
            })
    }
    const handleCancel = () => {
        setModalEditOpen(false)
    }
    return (
        <>
            {modalEditOpen ? (
                <Page>
                    <ModalDiv>
                        <h6>{question}</h6>
                        <form>
                            <input
                                style={{ marginTop: "20px" }}
                                type="file"
                                accept="image/png, image/jpeg"
                                onChange={onFileAdded}
                                ref={fileInput}
                                name="image"
                            />
                            <BtnContainer>
                                <div onClick={handleCancel}>
                                    <CancelButton btnValue={"Annuler"} />
                                </div>
                                <div onClick={handleUpdateAvatar}>
                                    <SendButton btnValue={"Effacer"} />
                                </div>
                            </BtnContainer>
                        </form>
                    </ModalDiv>
                </Page>
            ) : null}
        </>
    )
}
