import styled from "styled-components"
import PostCommentContent from "../PostCommentContent"
import PostCommentUser from "../PostCommentUser"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import updateLocale from "dayjs/plugin/updateLocale"
import PostCommentLike from "../PostCommentLike"

const Container = styled.section`
    background-color: var(--color-secondary);
    width: 97%;
    max-width: 500px;
    margin-right: auto;
    margin-left: auto;
    margin-top: 10px;
    padding: 10px;
`

export default function PostComment({ comment }) {
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
    return (
        <Container>
            <PostCommentUser comment={comment} />
            <PostCommentContent comment={comment} />
            <p>{dayjs(comment.dateAdd).fromNow()}</p>
            <PostCommentLike comment={comment} />
        </Container>
    )
}
