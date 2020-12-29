import React, { useContext, useRef } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { ModalContext } from '../../Application';
import useLockBodyScroll from '../../util/useLockBodyScroll';
import useOnOutsideCLick from '../../util/useOnOutsideClick';

export default function Modal() {
    const { modalOpen, modalContent, handleModal } = useContext(ModalContext)!;
    const modalRoot = document.getElementById('modal-root');
    const modalRef = useRef(null);

    function handleModalClose() {
        if (modalOpen) {
            handleModal();
        }
    }

    useOnOutsideCLick(modalRef, () => handleModalClose());

    useLockBodyScroll();

    if (modalOpen && modalRoot) {
        return ReactDOM.createPortal(
            <StyledModal>
                <ModalContent ref={modalRef}>{modalContent}</ModalContent>
            </StyledModal>,
            modalRoot,
        );
    } else {
        return null;
    }
}

const StyledModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    height: 100%;
    width: 100%;
    padding: 2% 15%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    @media screen and (max-width: 1000px) {
        padding: 2% 8%;
    }
    @media screen and (max-width: 600px) {
        padding: 2%;
    }
`;

const ModalContent = styled.div`
    position: relative;
    min-width: 60%;
    max-width: 100%;
    border-radius: 36px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 4px 4px 20px -6px ${(props) => props.theme.black};
    background: ${(props) =>
        `radial-gradient(ellipse at -40% -150%, ${props.theme.white} 36%, transparent)`};
    backdrop-filter: blur(8px);
`;
