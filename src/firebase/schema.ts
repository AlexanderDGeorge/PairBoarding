import { User as FirebaseUser } from 'firebase';
import {
    DIFFICULTIES,
    LANGUAGES,
    POSTTYPES,
} from '../Components/Post/constants';

export interface UserSchema {
    uid: FirebaseUser['uid'];
    blurb?: string;
    connections: FirebaseUser['uid'][];
    darkMode: 'auto' | 'light' | 'dark';
    email: string;
    emailPublic: boolean;
    githubURL?: string;
    linkedInURL?: string;
    location?: string;
    name: string;
    personalURL?: string;
    photoURL: string;
    postId?: string;
    posts: PostSchema['id'][];
    providerPhotoURL?: string;
    status: 'online' | 'offline' | 'in room';
    username: string;
}

export interface LightUserSchema {
    uid: UserSchema['uid'];
    username: UserSchema['username'];
    name: UserSchema['name'];
    photoURL: UserSchema['photoURL'];
}

export interface NotificationSchema {
    type: typeof NOTIFICATIONTYPES[number];
    from: LightUserSchema;
    to: UserSchema['uid'];
    content?: string;
}

export interface PostSchema {
    id: string;
    createdAt: Date;
    description: string;
    difficulty: typeof DIFFICULTIES[number];
    host: LightUserSchema;
    language: typeof LANGUAGES[number];
    maxCapacity?: number;
    participants: UserSchema['uid'][];
    start: Date;
    title: string;
    type: typeof POSTTYPES[number];
}

const NOTIFICATIONTYPES = [
    'connection',
    'room',
    'team',
    'pairboard',
    'reminder',
    'message',
] as const;
