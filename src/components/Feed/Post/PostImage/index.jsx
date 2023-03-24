import React from "react"
import styled from "styled-components"

const Img = styled.img`
    width: 80%;
`
export const PostImage = ({ post }) => {
    return <Img src={post.imageUrl} alt="postée par l'utilisateur" />
}
