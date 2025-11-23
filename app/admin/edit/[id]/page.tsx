import AdminProjectEditorWrapper from "@/components/AdminProjectEditorWrapper";
import { getProjectById } from "@/lib/projects";

interface EditProjectPageProps {
    params: Promise<{ id: string }>;
}

// This is a server component that fetches the project and passes it to the client editor
const EditProjectPage = async ({ params }: EditProjectPageProps) => {
    const { id } = await params;
    const project = await getProjectById(id);

    if (!project) {
        return <div className="text-white p-8">Project not found</div>;
    }

    // Serialize timestamps to plain objects
    const serializedProject = {
        ...project,
        created_at: project.created_at ? {
            seconds: project.created_at.seconds,
            nanoseconds: project.created_at.nanoseconds
        } : null,
        updated_at: project.updated_at ? {
            seconds: project.updated_at.seconds,
            nanoseconds: project.updated_at.nanoseconds
        } : null,
    };

    return <AdminProjectEditorWrapper initialProject={serializedProject as any} />;
};

export default EditProjectPage;
