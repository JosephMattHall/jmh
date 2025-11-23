"use client";
import React from 'react';
import { Update } from '@/types/update';
import { motion } from 'framer-motion';

interface LatestUpdatesProps {
    updates: Update[];
}

const LatestUpdates: React.FC<LatestUpdatesProps> = ({ updates }) => {
    if (!updates || updates.length === 0) return null;

    return (
        <section className="w-full py-16 px-6 bg-black/50 border-t border-white/5">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-px flex-grow bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
                    <h2 className="text-2xl font-bold text-gray-200 uppercase tracking-widest">Latest Updates</h2>
                    <div className="h-px flex-grow bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
                </div>

                <div className="space-y-6">
                    {updates.map((update, index) => (
                        <motion.div
                            key={update.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-blue-500/30 transition-colors"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-mono text-blue-400">
                                    {update.created_at ? new Date(update.created_at.seconds * 1000).toLocaleDateString() : ""}
                                </span>
                            </div>
                            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                                {update.content}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LatestUpdates;
