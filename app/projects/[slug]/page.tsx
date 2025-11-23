import { getProjectBySlug } from "@/lib/projects";
import ProjectContent from "@/components/ProjectContent";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

const ProjectPage = async ({ params }: ProjectPageProps) => {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
        <p className="text-red-400">Project not found.</p>
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            {project.title}
          </h1>
          <div className="flex items-center gap-4 text-gray-400 mb-6">
            {project.rating !== undefined && (
              <div className="flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full">
                <span className="text-yellow-400">★</span>
                <span className="font-medium text-white">{project.rating.toFixed(1)}</span>
              </div>
            )}
            <span>{project.created_at ? new Date(project.created_at.seconds * 1000).toLocaleDateString() : ""}</span>
          </div>

          <p className="text-xl text-gray-300 mb-8 leading-relaxed border-l-4 border-blue-500 pl-4">
            {project.summary}
          </p>

          <div className="relative rounded-xl overflow-hidden shadow-2xl mb-10 border border-gray-800">
            <img
              src={project.main_image}
              alt={project.title}
              className="w-full object-cover"
            />
          </div>

          {project.technologies?.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-10">
              {project.technologies.map(tech => (
                <span
                  key={tech}
                  className="text-sm font-medium bg-gray-800 text-blue-300 border border-blue-500/30 rounded-full px-4 py-1.5"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          <div className="flex gap-4 mb-12">
            {project.repository_url && (
              <a
                href={project.repository_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 border border-gray-700"
              >
                <span>GitHub Repo</span>
              </a>
            )}
            {project.website_url && (
              <a
                href={project.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors flex items-center gap-2 shadow-lg shadow-blue-900/20"
              >
                <span>Visit Website</span>
              </a>
            )}
          </div>

          <div className="border-t border-gray-800 pt-10">
            <ProjectContent blocks={project.content} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
