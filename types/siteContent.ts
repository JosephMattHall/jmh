import { Timestamp } from 'firebase/firestore';

export interface SiteContent {
    id: string; // e.g., 'about', 'home_hero'
    content: string; // HTML
    updated_at: Timestamp;
}
