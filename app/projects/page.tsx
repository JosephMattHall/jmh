import { getProjects } from "@/lib/projects";
import ProjectGrid from "@/components/ProjectGrid";

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
    <div className="min-h-screen p-8 pt-24 bg-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Projects Gallery
        </h1>
        <ProjectGrid projects={serializedProjects as any} />
      </div>
    </div>
  );
};

export default ProjectsPage;
