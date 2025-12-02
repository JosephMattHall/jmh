"use client";
import React, { useEffect, useState } from "react";
import { getUpdates, deleteUpdate, createUpdate } from "@/lib/updates";
import { Update } from "@/types/update";
import Link from "next/link";
import { Plus, Trash2, ArrowLeft, Edit } from "lucide-react";
import { Timestamp } from "firebase/firestore";
import ConfirmModal from "@/components/ConfirmModal";

const AdminUpdatesPage = () => {
    const [updates, setUpdates] = useState<Update[]>([]);
    const [loading, setLoading] = useState(true);
    const [newUpdateContent, setNewUpdateContent] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [editId, setEditId] = useState<string | null>(null);

    useEffect(() => {
        fetchUpdates();
    }, []);

    const fetchUpdates = async () => {
        const data = await getUpdates();
        setUpdates(data);
        setLoading(false);
    };

    const handleDelete = async () => {
        if (deleteId) {
            await deleteUpdate(deleteId);
            fetchUpdates();
            setDeleteId(null);
        }
    };

    const handleCreate = async () => {
        if (!newUpdateContent.trim()) return;

        // If editing, delete the old one first (simple "edit" implementation)
        // Ideally we would update the existing doc, but for now this works as a quick fix
        // or we could add an updateUpdate function to lib/updates.ts
        if (editId) {
            await deleteUpdate(editId);
        }

        await createUpdate({
            content: newUpdateContent,
            created_at: Timestamp.now(),
            title: "Update"
        });

        setNewUpdateContent("");
        setIsCreating(false);
        setEditId(null);
        fetchUpdates();
    };

    const startEdit = (update: Update) => {
        setNewUpdateContent(update.content);
        setEditId(update.id);
        setIsCreating(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) return <div className="p-8 text-white flex justify-center items-center min-h-screen">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-8 pt-24">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/admin" className="text-gray-400 hover:text-white transition-colors">
                            <ArrowLeft size={24} />
                        </Link>
                        <h1 className="text-3xl font-bold">Manage Updates</h1>
                    </div>
                    <button
                        onClick={() => {
                            setIsCreating(!isCreating);
                            setEditId(null);
                            setNewUpdateContent("");
                        }}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-lg shadow-blue-900/20"
                    >
                        <Plus size={20} />
                        {isCreating ? "Cancel" : "New Update"}
                    </button>
                </div>

                {isCreating && (
                    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-8 animate-fade-in-up shadow-xl">
                        <h2 className="text-lg font-semibold mb-4 text-gray-300">
                            {editId ? "Edit Update" : "Create New Update"}
                        </h2>
                        <textarea
                            value={newUpdateContent}
                            onChange={(e) => setNewUpdateContent(e.target.value)}
                            placeholder="What's new?"
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-4 text-white focus:ring-2 focus:ring-blue-500 outline-none mb-4 min-h-[120px]"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => {
                                    setIsCreating(false);
                                    setEditId(null);
                                    setNewUpdateContent("");
                                }}
                                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreate}
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
                            >
                                {editId ? "Update Post" : "Post Update"}
                            </button>
                        </div>
                    </div>
                )}

                <div className="space-y-4">
                    {updates.map(update => (
                        <div key={update.id} className="bg-gray-800 p-6 rounded-xl border border-gray-700 flex justify-between items-start group hover:border-gray-600 transition-colors shadow-md">
                            <div className="flex-1 mr-4">
                                <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{update.content}</p>
                                <p className="text-xs text-gray-500 mt-3 font-medium">
                                    {update.created_at ? new Date(update.created_at.seconds * 1000).toLocaleString() : "Just now"}
                                </p>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                                <button
                                    onClick={() => startEdit(update)}
                                    className="p-2 bg-gray-700 hover:bg-blue-500/20 hover:text-blue-400 rounded-lg text-gray-400 transition-all"
                                    title="Edit"
                                >
                                    <Edit size={18} />
                                </button>
                                <button
                                    onClick={() => setDeleteId(update.id)}
                                    className="p-2 bg-gray-700 hover:bg-red-500/20 hover:text-red-400 rounded-lg text-gray-400 transition-all"
                                    title="Delete"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <ConfirmModal
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
                title="Delete Update"
                message="Are you sure you want to delete this update? This action cannot be undone."
            />
        </div>
    );
};

export default AdminUpdatesPage;
