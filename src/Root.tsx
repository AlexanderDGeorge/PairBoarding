import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { auth } from "./firebase/firebase";
import App from "./App";
import useUserContext from "./Context/useUserContext";
import { UserSchema } from "./firebase/schema";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import LoadingPage from "./Pages/LoadingPage";
import { GlobalStyle } from "./styled-components/globalStyle";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./styled-components/theme";

export const UserContext = createContext<UserSchema | undefined>(undefined);

export default function Root() {
    const [uid, setUid] = useState<string | null>("loading");
    const user = useUserContext(uid);

    useEffect(() => {
        try {
            auth.onAuthStateChanged((firebaseUser) => {
                if (firebaseUser) {
                    setUid(firebaseUser.uid);
                } else {
                    setUid(null);
                }
            });
        } catch (error) {
            console.error(error.message);
            setUid("error");
        }
    }, []);

    if (user) {
        return (
            <ThemeProvider theme={lightTheme}>
                <UserContext.Provider value={user}>
                    <GlobalStyle />
                    <App />
                </UserContext.Provider>
            </ThemeProvider>
        );
    } else if (uid === "loading") {
        return (
            <ThemeProvider theme={lightTheme}>
                <BrowserRouter>
                    <GlobalStyle />
                    <LoadingPage />
                </BrowserRouter>
            </ThemeProvider>
        );
    } else if (uid === null) {
        return (
            <ThemeProvider theme={lightTheme}>
                <BrowserRouter>
                    <GlobalStyle />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/signup" component={SignupPage} />
                    <Route path="/" component={LandingPage} />
                </BrowserRouter>
            </ThemeProvider>
        );
    } else {
        // [TODO]: add errorPage
        return null;
    }
}
