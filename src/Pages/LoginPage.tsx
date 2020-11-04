import React from "react";
import styled from "styled-components";
import LoginForm from "../Components/Auth/LoginForm";
import { StyledButton, StyledButtonRow } from '../styled-components/StyledButtons';
import { FaGithub } from "react-icons/fa";
import { loginWithGithub } from "../firebase/auth";
import { Link } from "react-router-dom";
import { StyledH1 } from '../styled-components/StyledHeaders';

export default function LoginPage() {
    return (
        <Login>
            <StyledH1>Login</StyledH1>
            <LoginForm />
            <span>
                <div></div>
                OR
                <div></div>
            </span>
            <StyledButtonRow>

            <StyledButton onClick={loginWithGithub}>
                <FaGithub />
                Log in with Github
            </StyledButton>
            </StyledButtonRow>
            <Link style={{ marginTop: "10%" }} to="/signup">
                meant to sign up?
            </Link>
            <Link to="/password">forgot password?</Link>
        </Login>
    );
}

const Login = styled.div`
    min-height: 80%;
    width: 100%;
    padding: 10%;
    display: flex;
    flex-direction: column;
    > span {
        width: 100%;
        max-width: 600px;
        margin: 5% 0;
        padding: 0 10%;
        display: flex;
        align-items: center;
        font-size: 1em;
        font-weight: 500;
        > div {
            width: 50%;
            border-top: 1px solid ${(props) => props.theme.verydark};
        }
    }
    > a {
        height: 50px;
        width: 100%;
        max-width: 600px;
        text-align: center;
        color: ${(props) => props.theme.blue};
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }
`;
