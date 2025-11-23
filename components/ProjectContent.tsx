"use client";
import React from "react";
import "quill/dist/quill.snow.css"; // Import Quill styles for proper rendering

interface ProjectContentProps {
    blocks: any; // HTML string or legacy blocks
}

const ProjectContent: React.FC<ProjectContentProps> = ({ blocks }) => {
    // Handle legacy Editor.js blocks (if any exist in DB)
    if (Array.isArray(blocks)) {
        return (
            <div className="prose prose-invert prose-lg max-w-none mt-8 space-y-6">
                <p className="text-yellow-500">Legacy content format. Please update in admin.</p>
            </div>
        );
    }

    // Render HTML string from Quill
    return (
        <div
            className="prose prose-invert prose-lg max-w-none mt-8 space-y-6 ql-editor"
            style={{ padding: 0 }}
            dangerouslySetInnerHTML={{ __html: blocks }}
        />
    );
};

export default ProjectContent;
