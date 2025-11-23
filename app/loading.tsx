import React from 'react';

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm">
            <div className="relative flex flex-col items-center">
                <div className="relative w-24 h-24">
                    <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
                        <path
                            d="M50 25 L50 10 M50 90 L50 75 M25 50 L10 50 M90 50 L75 50 M32.3 32.3 L21.7 21.7 M78.3 78.3 L67.7 67.7 M32.3 67.7 L21.7 78.3 M78.3 21.7 L67.7 32.3"
                            stroke="currentColor"
                            strokeWidth="8"
                            strokeLinecap="round"
                            className="text-gray-700"
                        />
                        <circle cx="50" cy="50" r="20" className="text-blue-500" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path
                            d="M50 20 A30 30 0 0 1 80 50"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            className="text-blue-400"
                        />
                        <path
                            d="M50 80 A30 30 0 0 1 20 50"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            className="text-purple-400"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                </div>
                <p className="mt-4 text-gray-400 font-mono text-sm tracking-widest animate-pulse">LOADING SYSTEM...</p>
            </div>
        </div>
    );
}
