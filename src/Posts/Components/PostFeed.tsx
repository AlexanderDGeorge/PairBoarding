import React from 'react';
import styled from 'styled-components';
import PostLane from './PostLane';
import { firestore } from '../../firebase';

export default function PostFeed() {
    const date = new Date();
    const postsQuery = firestore()
        .collection('posts')
        .where('start_date', '<=', date.toString());

    // if we need to use > or < later
    // we can add an active field to Posts
    // cloud function cleanup when date passes
    return (
        <StyledPostFeed>
            <PostLane name="Create a Post" create />
            <PostLane name="All Posts" query={postsQuery} />
            <PostLane
                name="Pairboard Posts"
                query={postsQuery.where('type', '==', 'Pairboard')}
            />
            <PostLane
                name="Team Posts"
                query={postsQuery.where('type', '==', 'Team')}
            />
            <PostLane
                name="Lecture Posts"
                query={postsQuery.where('type', '==', 'Lecture')}
            />
        </StyledPostFeed>
    );
}

const StyledPostFeed = styled.div`
    min-height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`;
