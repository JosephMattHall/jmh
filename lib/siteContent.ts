export type SiteContent = {
  name: string;
  email?: string;
  phone?: string;
  github?: string;
  hero: {
    headline: string;
    body: string;
  };
  about: string;
  contact: {
    headline: string;
    body: string;
  };
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

export const getSiteContent = async (id: string) => {
  // Simulate async fetch
  await new Promise(resolve => setTimeout(resolve, 100));

  if (id === 'hero') {
    return {
      id: 'hero',
      content: `
        <h1>${siteContent.hero.headline}</h1>
        <p>${siteContent.hero.body}</p>
      `
    };
  }

  if (id === 'about') {
    return {
      id: 'about',
      content: siteContent.about
    };
  }

  if (id === 'contact') {
    return {
      id: 'contact',
      content: `
        <h1>${siteContent.contact.headline}</h1>
        <p>${siteContent.contact.body}</p>
      `
    };
  }

  return null;
};

export const updateSiteContent = async (id: string, content: string) => {
  // Simulate async update
  await new Promise(resolve => setTimeout(resolve, 500));
  console.warn(`Attempted to update content for ${id}, but content is now static in siteContent.ts`);
  throw new Error("Content is now managed via code (siteContent.ts) and cannot be updated via the admin panel.");
};