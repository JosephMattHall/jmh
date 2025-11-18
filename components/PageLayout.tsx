import React from 'react';

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ title, children }) => {
  return (
    <div className="w-full min-h-screen pt-28 pb-20 px-4 md:px-12 flex flex-col items-center">
      <div className="w-full max-w-5xl animate-fade-in-up">
        
        {/* Content Box: Darker pure grey (#121212), slightly transparent (90% opacity) */}
        <div className="w-full bg-[#4A4949]/30 backdrop-blur-sm rounded-lg p-8 md:p-12 shadow-2xl border border-white/5 text-gray-300 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
