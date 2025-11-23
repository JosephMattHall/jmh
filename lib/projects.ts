import { db } from "./firestore";
import { collection, getDocs, getDoc, doc, orderBy, query, where, addDoc, updateDoc } from "firebase/firestore";
import { Project } from "@/types/project";

const projectsCol = collection(db, "projects");

export const getProjects = async (): Promise<Project[]> => {
    const q = query(projectsCol, orderBy("created_at", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
};

export const getProjectBySlug = async (slug: string): Promise<Project | null> => {
    const q = query(projectsCol, where("slug", "==", slug));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    const docData = snapshot.docs[0];
    return { id: docData.id, ...docData.data() } as Project;
};

export const createProject = async (project: Omit<Project, "id">): Promise<string> => {
    const docRef = await addDoc(projectsCol, project);
    return docRef.id;
};

export const updateProject = async (id: string, project: Partial<Project>): Promise<void> => {
    const docRef = doc(db, "projects", id);
    await updateDoc(docRef, project);
};

export const getProjectById = async (id: string): Promise<Project | null> => {
    const docRef = doc(db, "projects", id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? ({ id: docSnap.id, ...docSnap.data() } as Project) : null;
};
