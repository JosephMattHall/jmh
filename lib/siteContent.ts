import { db } from "./firestore";
import {
    doc,
    getDoc,
    setDoc,
    Timestamp
} from "firebase/firestore";
import { SiteContent } from "@/types/siteContent";

const COLLECTION_NAME = "site_content";

export const getSiteContent = async (id: string): Promise<SiteContent | null> => {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as SiteContent;
    } else {
        return null;
    }
};

export const updateSiteContent = async (id: string, content: string) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    await setDoc(docRef, {
        content,
        updated_at: Timestamp.now()
    }, { merge: true });
};
