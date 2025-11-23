import { db } from "./firestore";
import {
    collection,
    getDocs,
    doc,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
    limit
} from "firebase/firestore";
import { Update } from "@/types/update";

const COLLECTION_NAME = "updates";

export const getUpdates = async (): Promise<Update[]> => {
    const q = query(collection(db, COLLECTION_NAME), orderBy("created_at", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Update));
};

export const getLatestUpdates = async (count: number = 3): Promise<Update[]> => {
    const q = query(collection(db, COLLECTION_NAME), orderBy("created_at", "desc"), limit(count));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Update));
};

export const createUpdate = async (update: Partial<Update>) => {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), update);
    return docRef.id;
};

export const deleteUpdate = async (id: string) => {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
};
