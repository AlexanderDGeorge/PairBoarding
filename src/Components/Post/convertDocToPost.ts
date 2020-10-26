import { PostSchema } from "../../firebase/schema";

export default function convertDocToPost(
    doc: firebase.firestore.DocumentData
): PostSchema {
    const post = {
        id: doc.id,
        active: doc.active,
        author: doc.author,
        commentsAllowed: doc.commentsAllowed,
        commentsId: doc.commentsId,
        createdAt: doc.createdAt,
        description: doc.description,
        difficulty: doc.difficulty,
        host: doc.host,
        language: doc.language,
        maxCapacity: doc.maxCapacity,
        participants: doc.participants,
        password: doc.password,
        private: doc.private,
        sessionDate: doc.sessionDate,
        sessionEnd: doc.sessionEnd,
        sessionStart: doc.sessionStart,
        title: doc.title,
        type: doc.type,
    };
    return post;
}
