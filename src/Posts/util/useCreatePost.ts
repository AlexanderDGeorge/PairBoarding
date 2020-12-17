import { useState } from 'react';
import { PostSchema } from '../postSchema';
import { fieldValue, firestore } from '../../firebase';

export interface CreatePostFormData {
    created_by: PostSchema['created_by'];
    title: PostSchema['title'];
    description: PostSchema['description'];
    difficulty: PostSchema['difficulty'];
    image_url: PostSchema['image_url'];
    language: PostSchema['language'];
    start_date: PostSchema['start_date'];
    type: PostSchema['type'];
}

export default function useCreatePost() {
    // check if subscribed or created any post during
    const [status, setStatus] = useState<
        'idle' | 'loading' | 'success' | 'error'
    >('idle');
    const [error, setError] = useState<string | undefined>(undefined);

    async function createPost(newPost: CreatePostFormData) {
        setError(undefined);
        setStatus('loading');
        const postRef = firestore().collection('posts').doc();
        const devRef = firestore()
            .collection('devs')
            .doc(newPost.created_by.uid);
        try {
            await postRef.set({
                id: postRef.id,
                created_at: new Date().toString(),
                current_occupants: [],
                max_capacity: 3,
                subscribers: [],
                ...newPost,
                start_date: newPost.start_date.toString(),
            });
            console.log('here');
            await devRef.update({
                created_posts: fieldValue.arrayUnion(postRef.id),
            });
            setStatus('success');
        } catch (err) {
            console.error(err.message);
            setError(err.message);
            setStatus('error');
        }
    }

    return { status, error, createPost };
}
