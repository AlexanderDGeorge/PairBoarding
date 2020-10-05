import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import usePostContext from "../Context/usePostContext";
import { initiateLocalStream } from "../firebase/room";
import LocalStream from "../Components/Room/LocalStream";
import PeerConnection from "../Components/Room/PeerConnection";
import Controls from "../Components/Room/Controls";
import { UserContext } from "../Application";

export default () => {
    const { uid, postId } = useContext(UserContext)!;
    const post = usePostContext(postId);
    const [localStream, setLocalStream] = useState<MediaStream | undefined>(
        undefined
    );

    useEffect(() => {
        (async () => {
            setLocalStream(await initiateLocalStream());
        })();
    }, []);

    if (post) {
        return (
            <RoomPage>
                <Controls post={post} localStream={localStream} />
                <Participants>
                    <LocalStream localStream={localStream} />
                    {post.participants.map((participantId, i) => {
                        if (uid === participantId) return null;
                        return (
                            <PeerConnection
                                key={i}
                                localStream={localStream}
                                recipientId={participantId}
                            />
                        );
                    })}
                </Participants>
            </RoomPage>
        );
    } else {
        console.log("a room associated with this post could not be found");
        return null;
        // [TODO]: add error 'A room associated with this post could not be found
        // redirecting...
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
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: right;
`;
