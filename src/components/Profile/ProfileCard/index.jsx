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
    const [btnValue, setBtnValue] = useState("")
    const [isAvatar, setIsAvatar] = useState(false)
    const [avatar, setAvatar] = useState([])
    const fileInput = useRef()

    useEffect(() => {
        setBtnValue("Ajouter votre photo de profil")
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
        e.preventDefault()
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
    return (
        <Container>
            {isAvatar ? (
                <div>
                    <Avatar src={avatar.imageUrl} alt="avatar" />
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
                    <SendButton type="submit" btnValue={btnValue} />
                </Form>
            )}
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
