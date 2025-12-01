import { getProjects } from "@/lib/projects";
import ProjectGrid from "@/components/ProjectGrid";
import PageLayout from "@/components/PageLayout";

export const dynamic = "force-dynamic";

const ProjectsPage = async () => {
  const projects = await getProjects();

  // Serialize timestamps
  const serializedProjects = projects.map(project => ({
    ...project,
    created_at: project.created_at ? {
      seconds: project.created_at.seconds,
      nanoseconds: project.created_at.nanoseconds
    } : null,
    updated_at: project.updated_at ? {
      seconds: project.updated_at.seconds,
      nanoseconds: project.updated_at.nanoseconds
    } : null,
  }));

  return (
    <PageLayout title="Projects Gallery">
      <h1 className="text-4xl font-bold mb-8 text-white tracking-tight">
        Projects Gallery
      </h1>
      <ProjectGrid projects={serializedProjects as any} />
    </PageLayout>
  );
};

export default ProjectsPage;
