"use client";
import React from "react";
import Link from "next/link";
import { Project } from "@/types/project";

interface ProjectCardProps {
    project: Project;
}

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    return (
        <Link href={`/projects/${project.slug}`} className="block h-full">
            <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-blue-900/20 h-full flex flex-col group"
            >
                <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60 z-10" />
                    <img
                        src={project.main_image}
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    {project.rating !== undefined && (
                        <div className="absolute top-3 right-3 z-20 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1 border border-white/10">
                            <span className="text-yellow-400 text-xs">★</span>
                            <span className="text-white text-xs font-bold">{project.rating.toFixed(1)}</span>
                        </div>
                    )}
                </div>

                <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-1">
                        {project.title}
                    </h3>

                    <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
                        {project.summary}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                        {project.technologies?.slice(0, 3).map(tech => (
                            <span
                                key={tech}
                                className="text-xs font-medium px-2 py-1 bg-gray-800 text-gray-300 rounded border border-gray-700 group-hover:border-gray-600 transition-colors"
                            >
                                {tech}
                            </span>
                        ))}
                        {project.technologies?.length > 3 && (
                            <span className="text-xs font-medium px-2 py-1 bg-gray-800 text-gray-500 rounded border border-gray-700">
                                +{project.technologies.length - 3}
                            </span>
                        )}
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

export default ProjectCard;
