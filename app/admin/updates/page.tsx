"use client";
import React, { useEffect, useState } from "react";
import { getUpdates, deleteUpdate, createUpdate } from "@/lib/updates";
import { Update } from "@/types/update";
import Link from "next/link";
import { Plus, Trash2, ArrowLeft } from "lucide-react";
import { Timestamp } from "firebase/firestore";

const AdminUpdatesPage = () => {
    const [updates, setUpdates] = useState<Update[]>([]);
    const [loading, setLoading] = useState(true);
    const [newUpdateContent, setNewUpdateContent] = useState("");
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        fetchUpdates();
    }, []);

    const fetchUpdates = async () => {
        const data = await getUpdates();
        setUpdates(data);
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this update?")) {
            await deleteUpdate(id);
            fetchUpdates();
        }
    };

    const handleCreate = async () => {
        if (!newUpdateContent.trim()) return;

        await createUpdate({
            content: newUpdateContent,
            created_at: Timestamp.now(),
            title: "Update" // Optional, maybe remove title if not needed
        });

        setNewUpdateContent("");
        setIsCreating(false);
        fetchUpdates();
    };

    if (loading) return <div className="p-8 text-white">Loading...</div>;

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
                        onClick={() => setIsCreating(!isCreating)}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <Plus size={20} />
                        New Update
                    </button>
                </div>

                {isCreating && (
                    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-8 animate-fade-in-up">
                        <textarea
                            value={newUpdateContent}
                            onChange={(e) => setNewUpdateContent(e.target.value)}
                            placeholder="What's new?"
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-4 text-white focus:ring-2 focus:ring-blue-500 outline-none mb-4 min-h-[100px]"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setIsCreating(false)}
                                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreate}
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
                            >
                                Post Update
                            </button>
                        </div>
                    </div>
                )}

                <div className="space-y-4">
                    {updates.map(update => (
                        <div key={update.id} className="bg-gray-800 p-6 rounded-xl border border-gray-700 flex justify-between items-start">
                            <div>
                                <p className="text-gray-300 whitespace-pre-wrap">{update.content}</p>
                                <p className="text-xs text-gray-500 mt-2">
                                    {update.created_at ? new Date(update.created_at.seconds * 1000).toLocaleString() : "Just now"}
                                </p>
                            </div>
                            <button
                                onClick={() => handleDelete(update.id)}
                                className="text-gray-500 hover:text-red-400 transition-colors p-2"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminUpdatesPage;
