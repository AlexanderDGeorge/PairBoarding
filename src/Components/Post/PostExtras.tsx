import React, { useContext } from "react";
import styled from "styled-components";
import { FaCommentAlt, FaEllipsisH } from "react-icons/fa";
import { ModalContext } from "../../Application";
import PostComments, { EmptyComments } from "./PostComments";
import { PostSchema } from "../../firebase/schema";

export default (props: { toggle: Function; post: PostSchema }) => {
    const { handleModal } = useContext(ModalContext)!;

    function handleOpenComments(e: React.MouseEvent) {
        e.stopPropagation();
        if (props.post.commentsId) {
            handleModal(<PostComments commentsId={props.post.commentsId} />);
        } else {
            handleModal(<EmptyComments />);
        }
    }

    function handleOpenDetails(e: React.MouseEvent) {
        e.stopPropagation();
        props.toggle();
    }

    return (
        <PostExtras>
            <FaCommentAlt onClick={handleOpenComments} />
            <FaEllipsisH onClick={handleOpenDetails} />
        </PostExtras>
    );
};

const PostExtras = styled.div`
    position: absolute;
    bottom: 0;
    left: calc(50% - 25px);
    width: 50px;
    padding: 5px;
    background-color: ${(props) => props.theme.light};
    display: flex;
    align-items: center;
    justify-content: space-between;
    > svg {
        position: relative;
        background-color: transparent;
        &:hover {
            fill: ${(props) => props.theme.white};
        }
    }
`;
