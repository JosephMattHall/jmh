"use client";
import React, { useEffect, useRef, useState } from "react";
import { getSiteContent, updateSiteContent } from "@/lib/siteContent";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface EditContentPageProps {
    params: Promise<{ id: string }>;
}

const EditContentPage = ({ params }: EditContentPageProps) => {
    const [id, setId] = useState<string>("");
    const quillRef = useRef<HTMLDivElement>(null);
    const quillInstance = useRef<Quill | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const unwrapParams = async () => {
            const resolvedParams = await params;
            setId(resolvedParams.id);
        };
        unwrapParams();
    }, [params]);

    useEffect(() => {
        if (!id || !quillRef.current) return;

        if (!quillInstance.current) {
            const quill = new Quill(quillRef.current, {
                theme: "snow",
                readOnly: true,
                modules: {
                    toolbar: false,
                },
            });
            quillInstance.current = quill;
        }

        const fetchContent = async () => {
            const data = await getSiteContent(id);
            if (data && quillInstance.current) {
                quillInstance.current.root.innerHTML = data.content;
            }
            setLoading(false);
        };

        fetchContent();
    }, [id]);

    const handleSave = async () => {
        if (!quillInstance.current) return;
        setSaving(true);
        try {
            await updateSiteContent(id, quillInstance.current.root.innerHTML);
            alert("Content saved successfully!");
        } catch (error) {
            console.error("Error saving content:", error);
            alert("Failed to save content.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-8 pt-24">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/content" className="text-gray-400 hover:text-white transition-colors">
                            <ArrowLeft size={24} />
                        </Link>
                        <h1 className="text-3xl font-bold capitalize">View {id.replace('_', ' ')}</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-full text-sm font-medium">
                            Read Only (Managed in Code)
                        </span>
                        <button
                            disabled={true}
                            className="bg-gray-700 text-gray-400 px-6 py-2 rounded-lg font-semibold flex items-center gap-2 cursor-not-allowed"
                        >
                            <Save size={20} />
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                {loading ? (
                    <div className="text-center py-12 text-gray-400">Loading editor...</div>
                ) : (
                    <div className="bg-gray-100 text-black rounded-lg overflow-hidden">
                        <div ref={quillRef} className="min-h-[400px]" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditContentPage;
