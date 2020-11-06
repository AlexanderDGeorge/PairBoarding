import { User as FirebaseUser } from "firebase";
import {
    DIFFICULTIES,
    LANGUAGES,
    POSTTYPES,
} from "../Components/Post/constants";

export interface UserSchema {
    uid: FirebaseUser["uid"];
    blurb?: string;
    connections: LightUserSchema[];
    darkMode: "auto" | "light" | "dark";
    email: string;
    emailPublic: boolean;
    emailVerified: boolean;
    githubURL?: string;
    linkedInURL?: string;
    location?: string;
    name: string;
    photoURL: string;
    personalURL?: string;
    postId?: string;
    posts: PostSchema["id"][];
    score?: number;
    status: "online" | "offline" | "in room";
    username: string;
}

export interface LightUserSchema {
    uid: UserSchema["uid"];
    username: UserSchema["username"];
    name?: UserSchema['name'];
    score?: UserSchema["score"];
    photoURL: UserSchema["photoURL"];
}

export interface PostSchema {
    id: string;
    active: boolean;
    author: LightUserSchema;
    createdAt: Date;
    description: string;
    difficulty: typeof DIFFICULTIES[number];
    eventEnd: Date;
    eventStart: Date;
    host: LightUserSchema;
    language: typeof LANGUAGES[number];
    maxCapacity?: number;
    participants: UserSchema["uid"][];
    password?: string;
    sessionDate: Date;
    sessionEnd: Date;
    sessionStart: Date;
    title: string;
    type: typeof POSTTYPES[number];
}

export interface RoomSchema {
    id: string;
    candidates: Candidate[];
    offers: Offer[];
}

interface Candidate {
    to: UserSchema["uid"];
    from: UserSchema["uid"];
    candidates: RTCIceCandidateInit[];
}

interface Offer {
    to: UserSchema["uid"];
    from: UserSchema["uid"];
    description: RTCSessionDescriptionInit;
}
