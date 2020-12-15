import React from 'react';
import { firestore } from '../../firebase';
import { UserSchema } from '../../firebase/schema';
import PostLane from '../Post/PostLane';

export default function Posts(props: { user: UserSchema }) {
    const { username } = props.user;

    return (
        <PostLane
            name={`Posts by ${username}`}
            query={firestore()
                .collection('posts')
                .where('host.username', '==', username)}
        />
    );
}
