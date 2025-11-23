import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 text-center">
            <div className="space-y-6 max-w-md">
                <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-gray-700 to-gray-900">
                    404
                </h1>
                <h2 className="text-2xl font-bold text-white">Page Not Found</h2>
                <p className="text-gray-400">
                    The component you are looking for seems to be missing from the system.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                    <Link
                        href="/"
                        className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                    >
                        <Home size={18} />
                        Return Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="px-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 border border-gray-700"
                    >
                        <ArrowLeft size={18} />
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}
