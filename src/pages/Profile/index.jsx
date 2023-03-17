import { useEffect, useState } from "react"
import ProfileCard from "../../components/Profile/ProfileCard"
import Navbar from "../../components/Shared/Navbar"
import axios from "axios"
import DeleteProfileButton from "../../components/Profile/DeleteProfileButton"

const API_URL = process.env.REACT_APP_API_URL

export default function Profile() {
    const userId = localStorage.getItem("userId")
    const [user, setUser] = useState([])

    useEffect(() => {
        async function getUser() {
            try {
                const res = await axios.get(API_URL + `/user/${userId}`)
                setUser(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getUser()
    }, [userId])
    return (
        <>
            <Navbar />
            <ProfileCard user={user} />
            <DeleteProfileButton />
        </>
    )
}
