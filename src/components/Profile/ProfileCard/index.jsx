import axios from "axios"
import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { API_URL } from "../../../utils/varibales/env_varibales"
import SendButton from "../../Shared/SendButton"

const Container = styled.section`
    background-color: #fff;
    width: 95%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    flex-direcion: column;
`
const Round = styled.div`
    width: 90px;
    height: 90px;
    background-color: blue;
    border-radius: 50%;
`
const Div = styled.div``

const Avatar = styled.img`
    width: 90px;
    height: 90px;
    border-radius: 50%;
    object-fit: cover;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
`

export default function ProfileCard({ user }) {
    const [isAvatar, setIsAvatar] = useState(false)
    const [avatar, setAvatar] = useState([])
    const fileInput = useRef()

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
    const handleUpdateAvatar = (e) => {
        e.preventDefault()
        const avatar = {
            userId: userId,
        }
        fd.append("avatar", JSON.stringify(avatar))
        axios
            .put(API_URL + `/avatar/${avatar._id}`, fd, {
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

    return (
        <Container>
            <p>
                {user.name}
                {" " + user.lastName}
            </p>

            {isAvatar ? (
                <div>
                    <Avatar src={avatar.imageUrl} alt="avatar" />
                    <Form onSubmit={handleUpdateAvatar}>
                        <SendButton
                            type="submit"
                            btnValue={"Modifier avatar"}
                        />
                        <SendButton type="submit" btnValue={"Supprimer"} />
                        <input
                            style={{ marginTop: "20px" }}
                            type="file"
                            accept="image/png, image/jpeg"
                            onChange={onFileAdded}
                            ref={fileInput}
                            name="image"
                        />
                    </Form>
                </div>
            ) : (
                <Form onSubmit={handleSubmit}>
                    <Round />
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={onFileAdded}
                        ref={fileInput}
                        name="image"
                    />
                    <SendButton type="submit" btnValue={"Ajouter avatar"} />
                </Form>
            )}
        </Container>
    )
}
