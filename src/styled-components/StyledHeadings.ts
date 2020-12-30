import styled from 'styled-components';

export const StyledH1 = styled.h1`
    /* width: 100%; */
    margin: 5px 0;
    font-weight: 500;
    font-size: 4em;
    /* background: ${(props) => props.theme.darkblue}; */
    background: ${(props) =>
        `linear-gradient(140deg, ${props.theme.blue}, 20%, ${props.theme.green})`};
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    display: flex;
    align-items: center;
    > select {
        margin: 0 8px;
        border: 1px solid ${(props) => props.theme.accent};
        font-size: 0.6em;
        font-weight: 500;
        color: ${(props) => props.theme.verydark};
        background: transparent;
    }
`;

export const HeavyH1 = styled.h1`
    margin: 5px 0;
    font-weight: 800;
    font-size: 3em;
    background: ${(props) =>
        `linear-gradient(140deg, ${props.theme.blue}, 20%, ${props.theme.green})`};
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
`;
