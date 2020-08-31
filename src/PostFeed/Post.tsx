import React, { useContext, SyntheticEvent } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { UserContext, ModalContext } from "../Application";
import { Session } from "../types/session_types";

export default (props: { post: Session }) => {
    const { offerUser, language, difficulty, tags, description } = props.post;

    const currentUser = useContext(UserContext)!;
    const { handleModal } = useContext(ModalContext)!;
    const history = useHistory();

    async function handleClick(e: SyntheticEvent) {
        e.stopPropagation();
        // if (currentUser.uid === userId) return;
    }

    function handleLink(e: SyntheticEvent) {
        e.stopPropagation();
        currentUser.uid === offerUser.uid
            ? history.replace("/profile/stats")
            : history.replace(`/user/${offerUser.username}`);
    }

    return (
        <StyledPost onClick={handleClick}>
            <PostHeader>
                <img src={offerUser.photoURL} alt="" />
                <button onClick={handleLink}>
                    {offerUser.username} | {offerUser.score}
                </button>
                <h4>{language}</h4>
            </PostHeader>
            <PostDescription>{description}</PostDescription>
            <PostInfo>
                <p>{difficulty}</p>
                {tags.map((tag, i: number) => (
                    <p key={i}>| {tag} </p>
                ))}
            </PostInfo>
        </StyledPost>
    );
};

const StyledPost = styled.div`
    height: 200px;
    width: 300px;
    margin-right: 10px;
    border: 1px solid ${(props) => props.theme.verydark};
    padding: 10px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    transition: all linear 0.2s;
    &:hover {
        transition: all linear 0.2s;
        border: 1px solid ${(props) => props.theme.accent};
        box-shadow: 0 0 20px -8px ${(props) => props.theme.verydark};
    }
`;

const PostHeader = styled.div`
    height: 50px;
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    > img {
        height: 100%;
        width: auto;
        margin-right: 10px;
    }
    > button {
        width: 200px;
        font-size: 1em;
        text-align: left;
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }
    > h4 {
        font-weight: 500;
    }
`;

const PostDescription = styled.div`
    height: 100px;
    width: 100%;
    margin-bottom: 10px;
    color: ${(props) => props.theme.medium};
`;

const PostInfo = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    > p {
        margin-right: 5px;
    }
`;
