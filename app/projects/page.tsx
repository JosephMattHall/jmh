import { getProjects } from "@/lib/projects";
import ProjectGrid from "@/components/ProjectGrid";

export const dynamic = "force-dynamic";

const ProjectsPage = async () => {
  const projects = await getProjects();

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Projects Gallery
        </h1>
        <ProjectGrid projects={projects} />
      </div>
    </div>
  );
};

export default ProjectsPage;
