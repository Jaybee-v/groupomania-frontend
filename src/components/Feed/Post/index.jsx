import styled from "styled-components"
import PostDataUser from "./PostDataUser"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import updateLocale from "dayjs/plugin/updateLocale"
import PostComm from "./PostComm"
import { useState } from "react"
import PostContent from "./PostContent"
import PostEditContent from "./PostEditContent"

const Container = styled.article`
    background-color: var(--color-secondary);
    width: 97%;
    margin-bottom: 10px;
    margin-right: auto;
    margin-left: auto;
    padding: 15px;
    border-radius: 10px;
    max-width: 500px;
`

const API_URL = process.env.REACT_APP_API_URL

export default function Post({ posts, post, index, setPosts }) {
    dayjs.extend(updateLocale)
    dayjs.updateLocale("en", {
        relativeTime: {
            future: "dans %s",
            past: "il y a %s",
            s: "quelques secondes",
            m: "1 minute",
            mm: "%d minutes",
            h: "1 heure",
            hh: "%d heures",
            d: "1 jour",
            dd: "%d jours",
            M: "1 mois",
            MM: "%d mois",
            y: "1 an",
            yy: "%d ans",
        },
    })
    dayjs.extend(relativeTime)

    // const { edit } = useContext(EditContext)
    const [edit, setEdit] = useState("content")

    const toggleClick = () => {
        edit === "content" ? setEdit("edit") : setEdit("content")
        console.log(edit)
    }

    return (
        <div>
            <Container>
                <PostDataUser
                    post={post}
                    setPosts={setPosts}
                    toggleClick={toggleClick}
                />
                {edit === "content" ? (
                    <PostContent post={post} />
                ) : (
                    <PostEditContent
                        setEdit={setEdit}
                        post={post}
                        posts={posts}
                        setPosts={setPosts}
                    />
                )}

                <p>{dayjs(post.dateAdd).fromNow()}</p>
                <PostComm post={post} setPosts={setPosts} />
            </Container>
        </div>

        // </Div>
    )
}
