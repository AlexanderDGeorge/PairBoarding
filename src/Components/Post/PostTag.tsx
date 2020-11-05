import React from 'react';
import styled from 'styled-components';

export default function PostTag(props: {tag: string}) {
    return (
        <StyledPostTag>
            {props.tag}
        </StyledPostTag>
    )
}

const StyledPostTag = styled.p`
    width: 100px;
    margin: 0 0 5px 5px;
    border-radius: 5px;
    padding: 5px;
    background-color: ${props => props.theme.dark} !important;
    color: ${props => props.theme.white};
    font-size: 0.8em;
    text-align: center;
`;