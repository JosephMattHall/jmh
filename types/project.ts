import { Timestamp } from "firebase/firestore";

export interface EditorJsBlock {
    id: string;
    type: string;
    data: any;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    summary: string;
    technologies: string[];
    content: any; // HTML string or Editor.js blocks (legacy support)
    repository_url?: string;
    website_url?: string;
    main_image: string;
    images?: string[];
    tags?: string[];
    created_at: Timestamp | { seconds: number, nanoseconds: number };
    updated_at: Timestamp | { seconds: number, nanoseconds: number };
    author_id?: string;
    slug: string;
    rating?: number;
}
