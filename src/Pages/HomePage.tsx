import React from "react";
import styled from "styled-components";
import PostBar from "../Post/PostBar";
import PostFeed from "../Post/PostFeed";

export default () => {
    return (
        <Home>
            <PostBar />
            <PostFeed />
        </Home>
    );
};

const Home = styled.div`
    min-height: 100%;
    height: 100%;
    width: 100%;
`;