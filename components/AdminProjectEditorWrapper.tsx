"use client";
import React from "react";
import dynamic from "next/dynamic";
import { Project } from "@/types/project";

const AdminProjectEditor = dynamic(() => import("./AdminProjectEditor"), {
    ssr: false,
    loading: () => <div className="text-white p-8">Loading editor...</div>
});

interface AdminProjectEditorWrapperProps {
    initialProject?: Project;
}

const AdminProjectEditorWrapper: React.FC<AdminProjectEditorWrapperProps> = (props) => {
    return <AdminProjectEditor {...props} />;
};

export default AdminProjectEditorWrapper;
