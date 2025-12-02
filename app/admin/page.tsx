"use client";
import React, { useEffect, useState } from "react";
import { getProjects } from "@/lib/projects";
import { getLatestUpdates, deleteUpdate } from "@/lib/updates";
import { Project } from "@/types/project";
import { Update } from "@/types/update";
import Link from "next/link";
import { Plus, ArrowRight, FileText, Bell, Edit, Trash2 } from "lucide-react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firestore";
import ConfirmModal from "@/components/ConfirmModal";

const AdminDashboard = () => {
    const [recentProjects, setRecentProjects] = useState<Project[]>([]);
    const [recentUpdates, setRecentUpdates] = useState<Update[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null);
    const [deleteUpdateId, setDeleteUpdateId] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const [projectsData, updatesData] = await Promise.all([
            getProjects(),
            getLatestUpdates(5)
        ]);
        // Sort projects by created_at desc and take top 5
        const sortedProjects = projectsData.sort((a, b) => {
            const dateA = a.created_at ? a.created_at.seconds : 0;
            const dateB = b.created_at ? b.created_at.seconds : 0;
            return dateB - dateA;
        }).slice(0, 5);

        setRecentProjects(sortedProjects);
        setRecentUpdates(updatesData);
        setLoading(false);
    };

    const handleDeleteProject = async () => {
        if (deleteProjectId) {
            await deleteDoc(doc(db, "projects", deleteProjectId));
            fetchData();
            setDeleteProjectId(null);
        }
    };

    const handleDeleteUpdate = async () => {
        if (deleteUpdateId) {
            await deleteUpdate(deleteUpdateId);
            fetchData();
            setDeleteUpdateId(null);
        }
    };

    if (loading) return <div className="p-8 text-white flex justify-center items-center min-h-screen">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-8 pt-24">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-8">
                    Admin Dashboard
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Projects Section */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <FileText className="text-blue-500" size={24} />
                                Recent Projects
                            </h2>
                            <div className="flex gap-2">
                                <Link
                                    href="/admin/projects"
                                    className="text-sm text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                                >
                                    View All <ArrowRight size={16} />
                                </Link>
                                <Link
                                    href="/admin/new"
                                    className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg transition-colors"
                                    title="Add Project"
                                >
                                    <Plus size={16} />
                                </Link>
                            </div>
                        </div>

                        <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-lg">
                            {recentProjects.length > 0 ? (
                                <div className="divide-y divide-gray-700">
                                    {recentProjects.map(project => (
                                        <div key={project.id} className="p-4 hover:bg-gray-700/30 transition-colors flex justify-between items-center group">
                                            <div>
                                                <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors">{project.title}</h3>
                                                <p className="text-xs text-gray-500">
                                                    {project.created_at ? new Date(project.created_at.seconds * 1000).toLocaleDateString() : "N/A"}
                                                </p>
                                            </div>
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    href={`/admin/edit/${project.id}`}
                                                    className="p-2 bg-gray-700 hover:bg-blue-500/20 hover:text-blue-400 rounded-lg text-gray-400 transition-all"
                                                    title="Edit"
                                                >
                                                    <Edit size={16} />
                                                </Link>
                                                <button
                                                    onClick={() => setDeleteProjectId(project.id)}
                                                    className="p-2 bg-gray-700 hover:bg-red-500/20 hover:text-red-400 rounded-lg text-gray-400 transition-all"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-8 text-center text-gray-500">No projects found.</div>
                            )}
                        </div>
                    </div>

                    {/* Recent Updates Section */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <Bell className="text-yellow-500" size={24} />
                                Recent Updates
                            </h2>
                            <div className="flex gap-2">
                                <Link
                                    href="/admin/updates"
                                    className="text-sm text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                                >
                                    View All <ArrowRight size={16} />
                                </Link>
                                <Link
                                    href="/admin/updates"
                                    className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg transition-colors"
                                    title="Add Update"
                                >
                                    <Plus size={16} />
                                </Link>
                            </div>
                        </div>

                        <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-lg">
                            {recentUpdates.length > 0 ? (
                                <div className="divide-y divide-gray-700">
                                    {recentUpdates.map(update => (
                                        <div key={update.id} className="p-4 hover:bg-gray-700/30 transition-colors flex justify-between items-center group">
                                            <div className="flex-1 min-w-0 mr-4">
                                                <p className="text-sm text-gray-300 line-clamp-2">{update.content}</p>
                                                <p className="text-xs text-gray-500 mt-2">
                                                    {update.created_at ? new Date(update.created_at.seconds * 1000).toLocaleString() : "Just now"}
                                                </p>
                                            </div>
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                                                <Link
                                                    href="/admin/updates"
                                                    className="p-2 bg-gray-700 hover:bg-blue-500/20 hover:text-blue-400 rounded-lg text-gray-400 transition-all"
                                                    title="Edit"
                                                >
                                                    <Edit size={16} />
                                                </Link>
                                                <button
                                                    onClick={() => setDeleteUpdateId(update.id)}
                                                    className="p-2 bg-gray-700 hover:bg-red-500/20 hover:text-red-400 rounded-lg text-gray-400 transition-all"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-8 text-center text-gray-500">No updates found.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmModal
                isOpen={!!deleteProjectId}
                onClose={() => setDeleteProjectId(null)}
                onConfirm={handleDeleteProject}
                title="Delete Project"
                message="Are you sure you want to delete this project? This action cannot be undone."
            />

            <ConfirmModal
                isOpen={!!deleteUpdateId}
                onClose={() => setDeleteUpdateId(null)}
                onConfirm={handleDeleteUpdate}
                title="Delete Update"
                message="Are you sure you want to delete this update? This action cannot be undone."
            />
        </div>
    );
};

export default AdminDashboard;
