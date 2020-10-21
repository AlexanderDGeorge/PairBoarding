import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import usePostContext from "../Context/usePostContext";
import { initiateLocalStream } from "../Components/Room/WebRTCFunctions";
import LocalStream from "../Components/Room/LocalStream";
import PeerConnection from "../Components/Room/PeerConnection";
import Controls from "../Components/Room/Controls";
import { UserContext } from "../Application";
import LoadingBar from "../Components/Animated/LoadingBar";
import useControls from "../Components/Room/useControls";

export default () => {
    const { uid, postId } = useContext(UserContext)!;
    const post = usePostContext(postId)!;
    const [connections, setConnections] = useState<RTCPeerConnection[]>([]);
    const [localStream, setLocalStream] = useState<MediaStream | undefined>(
        undefined
    );

    useEffect(() => {
        (async () => {
            setLocalStream(await initiateLocalStream());
        })();
    }, []);

    const addConnection = (peerConnection: RTCPeerConnection) => {
        setConnections((prevConnections) => [
            ...prevConnections,
            peerConnection,
        ]);
    };

    const controls = useControls(post, localStream, connections);

    if (post) {
        return (
            <RoomPage>
                <Controls controls={controls} />
                <Participants>
                    <LocalStream localStream={localStream} />
                    {post.participants.current.map((peerId, i) => {
                        if (uid === peerId) return null;
                        return (
                            <PeerConnection
                                key={i}
                                localStream={localStream}
                                peerId={peerId}
                                addConnection={addConnection}
                            />
                        );
                    })}
                </Participants>
            </RoomPage>
        );
    } else {
        // [TODO]: add error 'A room associated with this post could not be found
        // redirecting...
        return <LoadingBar />;
    }
};

const RoomPage = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const Participants = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: right;
`;
