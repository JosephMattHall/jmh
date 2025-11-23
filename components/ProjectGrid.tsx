"use client";
import React from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { Project } from "@/types/project";

interface ProjectGridProps {
    projects: Project[];
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        >
            {projects.map(project => (
                <motion.div key={project.id} variants={item} className="h-full">
                    <ProjectCard project={project} />
                </motion.div>
            ))}
        </motion.div>
    );
};

export default ProjectGrid;
