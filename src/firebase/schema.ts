import { User as FirebaseUser } from "firebase";

export interface UserSchema {
    uid: FirebaseUser["uid"];
    blurb: string;
    connections: Array<FirebaseUser["uid"]>;
    darkMode: "auto" | "light" | "dark";
    email: string;
    emailVerified: boolean;
    firstname: string;
    lastname: string;
    photoURL: string;
    postId?: string;
    score: number;
    status: "online" | "offline" | "in room";
    username: string;
}

export interface LightUserSchema {
    uid: UserSchema["uid"];
    username: UserSchema["username"];
    score: UserSchema["score"];
    photoURL: UserSchema["photoURL"];
}

export interface PostSchema {
    id: string;
    description: string;
    difficulty: "easy" | "medium" | "hard";
    host: LightUserSchema;
    language: string;
    maxCapacity: number;
    participants: Array<UserSchema["uid"]>;
    tags: Array<string>;
}

export interface RoomSchema {
    id: string;
    candidates: Array<Candidate>;
    offers: Array<Offer>;
}

interface Candidate {
    to: UserSchema["uid"];
    from: UserSchema["uid"];
    candidates: Array<RTCIceCandidateInit>;
}

interface Offer {
    to: UserSchema["uid"];
    from: UserSchema["uid"];
    description: RTCSessionDescriptionInit;
}