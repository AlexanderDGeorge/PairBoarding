import React, { createContext } from "react";
import styled, { ThemeProvider } from "styled-components";
import Routing from "./Routing";
import { GlobalStyle } from "./styled-components/globalStyle";
import useUserState from "./util/useUserState";
import useThemeState from "./util/useThemeState";
import { User } from "./firebase/user";
import useModal, { IModalContext } from "./Modal/useModal";

export const UserContext = createContext<User | undefined | null>(undefined);
export const ModalContext = createContext<IModalContext | undefined>(undefined);

export default function Application() {
    const currentUser = useUserState();
    const {
        modalOpen,
        setModalOpen,
        toggle,
        modalContent,
        setModalContent,
    } = useModal();

    return (
        <ApplicationContainer>
            <UserContext.Provider value={currentUser}>
                <ThemeProvider theme={useThemeState(currentUser)}>
                    <ModalContext.Provider
                        value={{
                            modalOpen,
                            setModalOpen,
                            toggle,
                            modalContent,
                            setModalContent,
                        }}
                    >
                        <GlobalStyle />
                        <Routing />
                    </ModalContext.Provider>
                </ThemeProvider>
            </UserContext.Provider>
        </ApplicationContainer>
    );
}

const ApplicationContainer = styled.div`
    height: 100%;
    width: 100%;
`;
