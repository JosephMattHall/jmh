import { Timestamp } from 'firebase/firestore';

export interface Update {
    id: string;
    title: string;
    content: string; // HTML or text
    created_at: Timestamp;
}
