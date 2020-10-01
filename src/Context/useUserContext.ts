import { useEffect, useState } from "react";
import { firestore } from "../firebase/firebase";
import { UserSchema } from "../firebase/schema";

export default (uid: string | null) => {
    const [user, setUser] = useState<UserSchema | undefined>(undefined);

    useEffect(() => {
        if (!uid) return;
        const unsubscribe = firestore()
            .collection("users")
            .doc(uid)
            .onSnapshot((snapshot) => {
                const data = snapshot?.data();
                if (!data) return;
                setUser({
                    uid: snapshot.id,
                    blurb: data.blurb,
                    connections: data.connections,
                    darkMode: data.darkMode,
                    email: data.email,
                    emailVerified: data.emailVerified,
                    firstname: data.firstname,
                    githubURL: data.githubURL,
                    lastname: data.lastname,
                    linkedInURL: data.linkedInURL,
                    location: data.location,
                    photoURL: data.photoURL,
                    portfolioURL: data.portfolioURL,
                    posts: data.posts,
                    score: data.score,
                    status: data.status,
                    postId: data.postId,
                    username: data.username,
                });
            });
        return () => {
            unsubscribe();
        };
    }, [uid]);

    return user;
};
