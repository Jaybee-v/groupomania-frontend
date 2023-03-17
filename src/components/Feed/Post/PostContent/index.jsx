import styled from "styled-components"

const Content = styled.div`
    margin: 15px 0;
    background-color: #fff;
    padding: 10px 10px 10px 5px;
    border-radius: 10px;
`

export default function PostContent({ post }) {
    return <Content>{post.content}</Content>
}
