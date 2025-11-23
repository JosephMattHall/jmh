"use client";
import React, { useEffect, useState } from "react";
import { getProjects } from "@/lib/projects";
import { Project } from "@/types/project";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firestore";

const AdminDashboard = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        const data = await getProjects();
        setProjects(data);
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this project?")) {
            await deleteDoc(doc(db, "projects", id));
            fetchProjects();
        }
    };

    if (loading) return <div className="p-8 text-white">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <div className="flex gap-4">
                        <Link
                            href="/admin/updates"
                            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                        >
                            Manage Updates
                        </Link>
                        <Link
                            href="/admin/new"
                            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                        >
                            <Plus size={20} />
                            Create New Project
                        </Link>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-xl">
                    <table className="w-full text-left">
                        <thead className="bg-gray-700/50 text-gray-400 uppercase text-sm">
                            <tr>
                                <th className="p-4">Title</th>
                                <th className="p-4">Slug</th>
                                <th className="p-4">Created At</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {projects.map(project => (
                                <tr key={project.id} className="hover:bg-gray-700/30 transition-colors">
                                    <td className="p-4 font-medium text-white">{project.title}</td>
                                    <td className="p-4 text-gray-400">{project.slug}</td>
                                    <td className="p-4 text-gray-400">
                                        {project.created_at ? new Date(project.created_at.seconds * 1000).toLocaleDateString() : "N/A"}
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                href={`/admin/edit/${project.id}`}
                                                className="p-2 bg-gray-700 hover:bg-gray-600 rounded text-blue-400 transition-colors"
                                            >
                                                <Edit size={18} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(project.id)}
                                                className="p-2 bg-gray-700 hover:bg-red-900/30 rounded text-red-400 transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
