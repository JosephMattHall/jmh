"use client";
import React, { useEffect, useRef, useState } from "react";
import { Project } from "@/types/project";
import { createProject, updateProject } from "@/lib/projects";
import { useRouter } from "next/navigation";
import { Timestamp } from "firebase/firestore";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface AdminProjectEditorProps {
    initialProject?: Project;
}

const AdminProjectEditor: React.FC<AdminProjectEditorProps> = ({ initialProject }) => {
    const quillRef = useRef<HTMLDivElement>(null);
    const quillInstance = useRef<Quill | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState<Partial<Project>>({
        title: "",
        description: "",
        summary: "",
        slug: "",
        repository_url: "",
        website_url: "",
        main_image: "",
        technologies: [],
        rating: 0,
        content: "",
        ...initialProject,
    });

    const [techInput, setTechInput] = useState("");

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted || !quillRef.current) return;

        if (!quillInstance.current) {
            const quill = new Quill(quillRef.current, {
                theme: "snow",
                modules: {
                    toolbar: [
                        [{ header: [1, 2, 3, 4, 5, 6, false] }],
                        ["bold", "italic", "underline", "strike"],
                        [{ list: "ordered" }, { list: "bullet" }],
                        [{ script: "sub" }, { script: "super" }],
                        [{ indent: "-1" }, { indent: "+1" }],
                        [{ direction: "rtl" }],
                        [{ color: [] }, { background: [] }],
                        [{ font: [] }],
                        [{ align: [] }],
                        ["link", "image", "video", "code-block"],
                        ["clean"],
                    ],
                },
            });

            quillInstance.current = quill;

            // Set initial content
            if (initialProject?.content) {
                // Check if content is Editor.js blocks (array) or HTML string
                if (Array.isArray(initialProject.content)) {
                    // TODO: Convert Editor.js blocks to HTML if needed, or just warn
                    console.warn("Legacy Editor.js content detected. Manual conversion required or clear content.");
                    quill.setText("Legacy content detected. Please rewrite.");
                } else {
                    quill.root.innerHTML = initialProject.content;
                }
            }

            quill.on("text-change", () => {
                setFormData(prev => ({ ...prev, content: quill.root.innerHTML }));
            });
        }
    }, [isMounted, initialProject]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleTechAdd = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && techInput.trim()) {
            e.preventDefault();
            setFormData(prev => ({
                ...prev,
                technologies: [...(prev.technologies || []), techInput.trim()],
            }));
            setTechInput("");
        }
    };

    const removeTech = (techToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            technologies: prev.technologies?.filter(t => t !== techToRemove),
        }));
    };

    const handleSave = async () => {
        if (!quillInstance.current) return;
        setLoading(true);

        try {
            const content = quillInstance.current.root.innerHTML;

            const projectData: any = {
                ...formData,
                content: content,
                updated_at: Timestamp.now(),
            };

            // Ensure rating is a number
            if (projectData.rating) {
                projectData.rating = parseFloat(projectData.rating.toString());
            }

            if (initialProject?.id) {
                await updateProject(initialProject.id, projectData);
            } else {
                projectData.created_at = Timestamp.now();
                await createProject(projectData);
            }

            router.push("/admin");
        } catch (error) {
            console.error("Error saving project:", error);
            alert("Failed to save project");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-8 pb-8 pt-24 bg-gray-900 min-h-screen text-white">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">
                    {initialProject ? "Edit Project" : "Create New Project"}
                </h1>
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
                >
                    {loading ? "Saving..." : "Save Project"}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                        <h2 className="text-xl font-semibold mb-4">Content</h2>
                        <div className="bg-gray-100 text-black rounded-lg overflow-hidden">
                            <div ref={quillRef} className="min-h-[500px]" />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 space-y-4">
                        <h2 className="text-xl font-semibold mb-4">Details</h2>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Slug</label>
                            <input
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Rating (0-5)</label>
                            <input
                                type="number"
                                name="rating"
                                min="0"
                                max="5"
                                step="0.1"
                                value={formData.rating}
                                onChange={handleChange}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={3}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Summary</label>
                            <textarea
                                name="summary"
                                value={formData.summary}
                                onChange={handleChange}
                                rows={2}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Main Image URL</label>
                            <input
                                type="text"
                                name="main_image"
                                value={formData.main_image}
                                onChange={handleChange}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Repository URL</label>
                            <input
                                type="text"
                                name="repository_url"
                                value={formData.repository_url}
                                onChange={handleChange}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Website URL</label>
                            <input
                                type="text"
                                name="website_url"
                                value={formData.website_url}
                                onChange={handleChange}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Technologies</label>
                            <input
                                type="text"
                                value={techInput}
                                onChange={(e) => setTechInput(e.target.value)}
                                onKeyDown={handleTechAdd}
                                placeholder="Press Enter to add"
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none mb-2"
                            />
                            <div className="flex flex-wrap gap-2">
                                {formData.technologies?.map(tech => (
                                    <span
                                        key={tech}
                                        className="text-xs bg-gray-700 text-gray-200 rounded px-2 py-1 flex items-center gap-1"
                                    >
                                        {tech}
                                        <button
                                            onClick={() => removeTech(tech)}
                                            className="hover:text-red-400"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProjectEditor;
