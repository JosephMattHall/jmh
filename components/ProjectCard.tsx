"use client";
import React from "react";
import Link from "next/link";
import { Project } from "@/types/project";

interface ProjectCardProps {
    project: Project;
}

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
    <Link href={`/projects/${project.slug}`}>
        <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="block rounded-xl overflow-hidden shadow-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-gray-600 transition-colors h-full flex flex-col"
        >
            <div className="relative h-48 w-full overflow-hidden">
                <img
                    src={project.main_image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-medium text-white">
                        {project.rating ? project.rating.toFixed(1) : "N/A"}
                    </span>
                </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-grow">
                    {project.description}
                </p>

                {project.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-auto">
                        {project.technologies.slice(0, 3).map(tech => (
                            <span
                                key={tech}
                                className="text-[10px] font-medium bg-gray-700/50 text-gray-300 border border-gray-600/50 rounded-full px-2 py-1"
                            >
                                {tech}
                            </span>
                        ))}
                        {project.technologies.length > 3 && (
                            <span className="text-[10px] font-medium text-gray-500 px-1 py-1">
                                +{project.technologies.length - 3}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    </Link>
);

export default ProjectCard;
