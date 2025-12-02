export type SiteContent = {
  name: string;
  email?: string;
  phone?: string;
  github?: string | { url: string; username: string };
  hero: {
    headline: string;
    body: string;
  };
  contact?: {
    headline: string;
    body: string;
  };
  about: string;
};

export const siteContent: SiteContent = {
  name: "Joseph Hall",
  email: "you@example.com",
  phone: "(555) 555-5555",
  github: {
    url: "https://github.com/JosephMattHall",
    username: "JosephMattHall",
  },
  hero: {
    headline: "Build. Learn. Improve.",
    body: "I work on small apps, hardware projects, and 3D printed designs — a steady roll of experiments and improvements.",
  },
  contact: {
    headline: "Contact Me",
    body: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.",
  },
  about:
    "My name is Joseph Hall. I create small applications, prototypes, and tech-focused projects, focusing on practical solutions. I enjoy problem-solving, learning new tools, and steadily improving my work. This site highlights the projects I’m building and the ideas I’m developing along the way.",
};

import { db } from "./firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const getSiteContent = async (id: string) => {
  try {
    const docRef = doc(db, "site_content", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as { id: string, content: string };
    }
    return null;
  } catch (error) {
    console.error("Error fetching site content:", error);
    return null;
  }
};

export const updateSiteContent = async (id: string, content: string) => {
  try {
    const docRef = doc(db, "site_content", id);
    await setDoc(docRef, { content }, { merge: true });
  } catch (error) {
    console.error("Error updating site content:", error);
    throw error;
  }
};