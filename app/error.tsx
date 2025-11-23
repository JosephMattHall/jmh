'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 text-center">
            <div className="space-y-6 max-w-md bg-gray-900/50 p-8 rounded-2xl border border-red-500/20">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto text-red-500">
                    <AlertTriangle size={32} />
                </div>

                <h2 className="text-2xl font-bold text-white">System Malfunction</h2>
                <p className="text-gray-400">
                    Something went wrong while processing your request.
                </p>

                <button
                    onClick={reset}
                    className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-500 transition-colors flex items-center justify-center gap-2 mx-auto w-full"
                >
                    <RefreshCw size={18} />
                    Try Again
                </button>
            </div>
        </div>
    );
}
