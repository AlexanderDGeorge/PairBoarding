import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdSend, MdLink } from 'react-icons/md';
import styled from 'styled-components';
import { DevPublicProfile } from '../devSchema';

export default function DevLinks(props: { dev: DevPublicProfile }) {
    const { personal_url, github_url, linkedIn_url } = props.dev;

    return (
        <StyledDevLinks>
            <StyledLink style={{ background: '#555' }} href={personal_url}>
                <MdLink />
            </StyledLink>
            <StyledLink style={{ background: '#333' }}>
                <MdSend />
            </StyledLink>
            <StyledLink style={{ background: 'black' }} href={github_url}>
                <FaGithub />
            </StyledLink>
            <StyledLink style={{ background: '#0072b1' }} href={linkedIn_url}>
                <FaLinkedin />
            </StyledLink>
        </StyledDevLinks>
    );
}

const StyledDevLinks = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledLink = styled.a`
    height: 80px;
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    > svg {
        height: 30px;
        width: auto;
        fill: ${(props) => props.theme.white};
    }
`;
