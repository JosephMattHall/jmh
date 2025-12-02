
import React from "react";
import Link from "next/link";
import { ArrowLeft, FileText, ArrowRight } from "lucide-react";

const contentPages = [
    { id: "about", title: "About Page", description: "The main content of the About Me page." },
    { id: "home_hero", title: "Home Hero Text", description: "The main headline and subtext on the homepage." },
];

const AdminContentPage = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-8 pt-24">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    {/* <Link href="/admin" className="text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft size={24} />
                    </Link> */}
                    <h1 className="text-3xl font-bold">Manage Site Content</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {contentPages.map(page => (
                        <div
                            key={page.id}
                            // href={`/admin/content/${page.id}`}
                            className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 hover:bg-gray-800/80 transition-all group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg">
                                    <FileText size={24} />
                                </div>
                                <ArrowRight className="text-gray-500 group-hover:text-blue-400 transition-colors" size={20} />
                            </div>
                            <h2 className="text-xl font-bold text-white mb-2">{page.title}</h2>
                            <p className="text-gray-400 text-sm">{page.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminContentPage;
