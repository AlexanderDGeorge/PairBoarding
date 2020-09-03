import { UserLite } from "./user_types";

export interface Session extends NewSession {
    id: string;
    answer?: string;
    answerCandidate?: string;
    answerUser?: UserLite;
    createdAt: string;
    offer: string;
    offerCandidate?: string;
    offerUser: UserLite;
}

export interface NewSession {
    // [TODO]: make this safer
    [field: string]: any;
    language: string;
    difficulty: string;
    tags: Array<string>;
    description: string;
}
