"use client";
import React, { useEffect, useState } from "react";
import { getProjects } from "@/lib/projects";
import { Project } from "@/types/project";
import Link from "next/link";
import { Plus, Edit, Trash2, Search, ArrowLeft } from "lucide-react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firestore";
import ConfirmModal from "@/components/ConfirmModal";

const AdminProjectsPage = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        const data = await getProjects();
        setProjects(data);
        setLoading(false);
    };

    const handleDelete = async () => {
        if (deleteId) {
            await deleteDoc(doc(db, "projects", deleteId));
            fetchProjects();
            setDeleteId(null);
        }
    };

    const filteredProjects = projects.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="p-8 text-white flex justify-center items-center min-h-screen">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-8 pt-24">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div className="flex items-center gap-4">
                        <Link href="/admin" className="text-gray-400 hover:text-white transition-colors">
                            <ArrowLeft size={24} />
                        </Link>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            Manage Projects
                        </h1>
                    </div>
                    <Link
                        href="/admin/new"
                        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40"
                    >
                        <Plus size={20} />
                        New Project
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                </div>

                <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-900/50 text-gray-400 uppercase text-xs tracking-wider font-medium">
                                <tr>
                                    <th className="p-6">Title</th>
                                    <th className="p-6">Slug</th>
                                    <th className="p-6">Created</th>
                                    <th className="p-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {filteredProjects.map(project => (
                                    <tr key={project.id} className="hover:bg-gray-700/30 transition-colors group">
                                        <td className="p-6 font-medium text-white group-hover:text-blue-400 transition-colors">
                                            {project.title}
                                        </td>
                                        <td className="p-6 text-gray-500 font-mono text-sm">{project.slug}</td>
                                        <td className="p-6 text-gray-500 text-sm">
                                            {project.created_at ? new Date(project.created_at.seconds * 1000).toLocaleDateString() : "N/A"}
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    href={`/admin/edit/${project.id}`}
                                                    className="p-2 bg-gray-700 hover:bg-blue-500/20 hover:text-blue-400 rounded-lg text-gray-400 transition-all"
                                                    title="Edit"
                                                >
                                                    <Edit size={18} />
                                                </Link>
                                                <button
                                                    onClick={() => setDeleteId(project.id)}
                                                    className="p-2 bg-gray-700 hover:bg-red-500/20 hover:text-red-400 rounded-lg text-gray-400 transition-all"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredProjects.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="p-8 text-center text-gray-500">
                                            No projects found matching your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <ConfirmModal
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
                title="Delete Project"
                message="Are you sure you want to delete this project? This action cannot be undone."
            />
        </div>
    );
};

export default AdminProjectsPage;
