import React from "react";
import styled from "styled-components";
import { LoadingBar } from "../Components/AnimatedComponents/Loaders";

export default () => {
    return (
        <Loading>
            <LoadingBar />
        </Loading>
    );
};

const Loading = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
