import { useEffect, useState } from "react";
import { firestore } from "../firebase/firebase";
import { PostSchema } from "../firebase/schema";

export default (postId?: PostSchema["id"]) => {
    const [post, setPost] = useState<PostSchema | undefined>(undefined);

    useEffect(() => {
        if (!postId) return;

        const unsubscribe = firestore()
            .collection("posts")
            .doc(postId)
            .onSnapshot((snapshot) => {
                const data = snapshot?.data();
                if (!data) return;
                setPost({
                    id: snapshot.id,
                    active: data.active,
                    createdAt: data.createdAt,
                    description: data.description,
                    difficulty: data.difficulty,
                    host: data.host,
                    language: data.language,
                    maxCapacity: data.maxCapacity,
                    participants: data.participants,
                    tags: data.tags,
                });
            });
        return () => {
            unsubscribe();
        };
    }, [postId]);

    return post;
};
