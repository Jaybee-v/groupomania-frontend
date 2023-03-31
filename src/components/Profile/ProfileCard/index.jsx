import axios from "axios"
import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { API_URL } from "../../../utils/varibales/env_varibales"
import SendButton from "../../Shared/SendButton"
import Modal from "../../Shared/Modal"
import ModalFile from "../../Shared/ModalFile"

const Container = styled.section`
    background-color: #fff;
    width: 95%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Round = styled.div`
    width: 90px;
    height: 90px;
    background-color: blue;
    border-radius: 50%;
`
const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 10px;
`

const Avatar = styled.img`
    width: 90px;
    height: 90px;
    border-radius: 50%;
    object-fit: cover;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    padding: 15px 0;
`

const Name = styled.div`
    padding-top: 10px;
    display: flex;
    font-size: 25px;
`

const Label = styled.p`
    font-size: 16px;
    font-weight: 500;
    position: relative;
    width: 100%;
    padding: 10px 0 10px 5px;
`

const Text = styled.p`
    font-size: 14px;
`
const Separation = styled.div`
    width: 90%;
    height: 1px;
    background-color: #ccc;
    margin: auto;
`

export default function ProfileCard({ user }) {
    const [modalOpen, setModalOpen] = useState(false)
    const [modalEditOpen, setModalEditOpen] = useState(false)
    const [isAvatar, setIsAvatar] = useState(false)
    const [avatar, setAvatar] = useState([])
    const fileInput = useRef()
    const token = localStorage.getItem("token")
    useEffect(() => {
        const getAvatar = async () => {
            try {
                const res = await axios.get(API_URL + `/avatar/${user._id}`)
                if (res.data === null) {
                    setIsAvatar(false)
                } else {
                    setIsAvatar(true)
                    setAvatar(res.data)
                }
                console.log("avatar", res)
            } catch (err) {
                console.log(err)
            }
        }
        getAvatar()
    }, [user])

    const fd = new FormData()
    const userId = localStorage.getItem("userId")
    const handleSubmit = (e) => {
        const avatar = {
            userId: userId,
        }
        fd.append("avatar", JSON.stringify(avatar))
        console.log("data", fd)
        axios
            .post(API_URL + "/avatar/", fd, {
                header: {
                    "content-type": "multipart/form-data",
                },
            })
            .then((response) => {
                console.log(response)
            })
    }

    const onFileAdded = (e) => {
        e.preventDefault()
        console.log(fileInput)
        const selectedFile = fileInput.current.files[0]
        console.log(selectedFile)
        fd.append("image", selectedFile)
    }
    const handleDelete = async (e) => {
        e.preventDefault()
        await axios.delete(
            process.env.REACT_APP_API_URL + `/avatar/${avatar._id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        setIsAvatar(false)
        setModalOpen(false)
        document.location.reload()
    }
    console.log("AVATAR", avatar)
    return (
        <Container>
            <Name>
                {user.name}
                {" " + user.lastName}
            </Name>

            {isAvatar ? (
                <Div>
                    <Label>Avatar:</Label>
                    <Avatar src={avatar.imageUrl} alt="avatar" />
                    <Form>
                        <div
                            onClick={(e) => {
                                e.preventDefault()
                                setModalOpen(true)
                            }}
                        >
                            <SendButton type="submit" btnValue={"Supprimer"} />
                        </div>
                    </Form>
                </Div>
            ) : (
                <Div>
                    <Round />
                    <Form onSubmit={handleSubmit}>
                        <input
                            type="file"
                            accept="image/png, image/jpeg"
                            onChange={onFileAdded}
                            ref={fileInput}
                            name="image"
                        />
                        <SendButton type="submit" btnValue={"Ajouter avatar"} />
                    </Form>
                </Div>
            )}
            <Separation></Separation>
            <Div>
                <Label>Email:</Label>
                <Text>{user.email}</Text>
            </Div>
            {modalOpen ? (
                <Modal
                    question={
                        "Êtes vous certain de vouloir supprimer votre avatar?"
                    }
                    valid={handleDelete}
                    setModalOpen={setModalOpen}
                    modalOpen={modalOpen}
                />
            ) : null}
        </Container>
    )
}
