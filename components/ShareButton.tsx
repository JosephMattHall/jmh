"use client";
import React, { useState } from 'react';
import { Share2, X, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShareButtonProps {
    title: string;
    slug: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ title, slug }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    // In a real app, you'd get the base URL from env or window
    const url = typeof window !== 'undefined' ? `${window.location.origin}/projects/${slug}` : `/projects/${slug}`;
    const [shareText, setShareText] = useState(`Check out this project: ${title}`);

    const handleCopy = () => {
        navigator.clipboard.writeText(`${shareText} ${url}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareToTwitter = () => {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`;
        window.open(twitterUrl, '_blank');
    };

    const shareToLinkedIn = () => {
        const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        window.open(linkedinUrl, '_blank');
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 border border-gray-700"
            >
                <Share2 size={18} />
                <span>Share</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-md shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-white">Share Project</h3>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        Customize Message
                                    </label>
                                    <textarea
                                        value={shareText}
                                        onChange={(e) => setShareText(e.target.value)}
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none h-24"
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={shareToTwitter}
                                        className="flex-1 bg-[#1DA1F2] hover:bg-[#1a91da] text-white py-2 rounded-lg font-medium transition-colors"
                                    >
                                        Twitter
                                    </button>
                                    <button
                                        onClick={shareToLinkedIn}
                                        className="flex-1 bg-[#0A66C2] hover:bg-[#0958a8] text-white py-2 rounded-lg font-medium transition-colors"
                                    >
                                        LinkedIn
                                    </button>
                                </div>

                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-700"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-gray-900 text-gray-500">Or copy link</span>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        readOnly
                                        value={url}
                                        className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 text-gray-400 text-sm"
                                    />
                                    <button
                                        onClick={handleCopy}
                                        className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                                    >
                                        {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ShareButton;
