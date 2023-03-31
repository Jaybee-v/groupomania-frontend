import React from "react"
import styled from "styled-components"

const Img = styled.img`
    width: 100%;
    margin-top: 10px;
`
export const PostImage = ({ post }) => {
    return (
        <>
            {post.imageUrl !== null ? (
                <Img src={post.imageUrl} alt="postée par l'utilisateur" />
            ) : null}
        </>
    )
}
