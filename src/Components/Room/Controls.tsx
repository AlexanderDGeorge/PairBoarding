import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { leaveRoom } from "../../firebase/room";
import { PostSchema } from "../../firebase/schema";
import { UserContext } from "../../Application";
import { closePost } from "../../firebase/post";
import { initiateScreenShare } from "./WebRTCFunctions";

export default (props: {
    post: PostSchema;
    localStream?: MediaStream;
    connections: RTCPeerConnection[];
}) => {
    const { post, localStream, connections } = props;
    const { uid } = useContext(UserContext)!;
    const [audio, setAudio] = useState(true);
    const [video, setVideo] = useState(true);
    // const [screen, setScreen] = useState<MediaStream | undefined>(undefined);

    useEffect(() => {
        if (!localStream) return;
    }, [localStream]);

    async function handleLeave() {
        if (post.participants.length > 1) {
            await leaveRoom(uid, post.id);
        } else {
            await leaveRoom(uid, post.id);
            closePost(post.id);
        }
    }

    function toggleAudio() {
        if (!localStream) return;
        localStream.getAudioTracks()[0].enabled = !audio;
        setAudio(!audio);
    }

    function toggleVideo() {
        if (!localStream) return;
        localStream.getVideoTracks()[0].enabled = !video;
        setVideo(!video);
    }

    async function shareScreen() {
        if (!localStream) return;
        const screenShare = await initiateScreenShare();
        connections.forEach((connection) => {
            connection
                .getSenders()
                .find((sender) => sender.track?.kind === "video")
                ?.replaceTrack(screenShare.getTracks()[0]);
        });
        console.log(connections);
    }

    return (
        <Controls>
            <Button onClick={handleLeave}>Leave Room</Button>
            <Button onClick={toggleAudio}>{audio ? "Mute" : "Unmute"}</Button>
            <Button onClick={toggleVideo}>
                {video ? "Hide Video" : "Show Video"}
            </Button>
            <Button onClick={shareScreen}>Share Screen</Button>
        </Controls>
    );
};

const Controls = styled.div`
    height: 100%;
    min-width: 80px;
    width: 10%;
    padding: 25% 10px 10px 10px;
    background-color: ${(props) => props.theme.verydark};
    border-right: 5px solid ${(props) => props.theme.verydark};
    border-image: ${(props) =>
        `linear-gradient(140deg, ${props.theme.orange}, ${props.theme.yellow}, ${props.theme.green}, ${props.theme.blue}) 3`};
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
`;

const Button = styled.button`
    height: 60px;
    min-width: 100px;
    font-size: 1em;
    background-color: transparent;
    color: ${(props) => props.theme.verylight};
    transition: color 0.25s linear;
    &:hover {
        transition: color 0.25s linear;
        color: ${(props) => props.theme.white};
    }
`;
