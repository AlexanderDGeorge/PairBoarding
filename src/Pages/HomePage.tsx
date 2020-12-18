import React from 'react';
import styled from 'styled-components';
import PostFeed from '../Posts/Components/PostFeed';

export default function HomePage() {
    return (
        <Home>
            <PostFeed />
        </Home>
    );
}

const Home = styled.div`
    width: 100%;
`;
