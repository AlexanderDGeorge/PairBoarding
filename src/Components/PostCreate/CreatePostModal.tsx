import React, { useRef, useState } from "react";
import styled from "styled-components";
import { PostSchema } from "../../firebase/schema";
import useLockBodyScroll from "../../util/useLockBodyScroll";
import FormContainer from "./FormContainer";

export default function CreatePostModal(props: { type: PostSchema["type"] }) {
    const modalRef = useRef(null);
    const [type, setType] = useState<string>(props.type);

    // [TODO]: figure out how to get this to work with react-datepicker
    // useOnOutsideCLick(modalRef, () => handleModal());
    useLockBodyScroll();

    function ModalContent() {
        switch (type) {
            case "Pairboard":
                return (
                    <>
                        <p>
                            Pairboards are intended for one on one learning.{" "}
                            <br />
                            Room limits are capped at two occupants.
                        </p>
                        <FormContainer type={type} />
                    </>
                );
            case "Team":
                return (
                    <>
                        <p>
                            Teams are intended for collaboration. <br />
                            Room limits are capped at 20 occupants.
                        </p>
                        <FormContainer type={type} />
                    </>
                );
            case "Lecture":
                return (
                    <>
                        <p>
                            Lectures are intended for one or a few main
                            speakers. <br />
                            Room limits are capped at 1,000 occupants.
                        </p>
                        <FormContainer type={type} />
                    </>
                );
            default:
                return null;
        }
    }

    return (
        <StyledModal ref={modalRef}>
            <h1>
                Create a{" "}
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="Pairboard">Pairboard</option>
                    <option value="Team">Team</option>
                    <option value="Lecture">Lecture</option>
                </select>{" "}
                Post
            </h1>
            <ModalContent />
        </StyledModal>
    );
}

const StyledModal = styled.div`
    border-radius: 5px;
    padding: 2%;
    background-color: ${props => props.theme.white};
    display: flex;
    flex-direction: column;
    cursor: auto;
    overflow-y: scroll;
    > h1 {
        margin-bottom: 10px;
        font-weight: 800;
        font-size: 3em;
        background: ${(props) =>
            `linear-gradient(140deg, ${props.theme.green}, ${props.theme.blue})`};
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        > select {
            border: 1px solid ${(props) => props.theme.accent};
            font-size: inherit;
            font-weight: 500;
            color: ${(props) => props.theme.verydark};
            background: transparent;
        }
    }
    > p {
        margin-bottom: 20px;
    }
`;
