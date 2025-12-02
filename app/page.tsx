import React from 'react'
import Hero from '../components/Hero'
import { getProjects } from '@/lib/projects'
import { getLatestUpdates } from '@/lib/updates'
import LatestUpdates from '@/components/LatestUpdates'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { siteContent } from "@/lib/siteContent"

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const projects = await getProjects();
  const latestProject = projects.length > 0 ? projects[0] : null;
  const heroContent = siteContent.hero;

  // Serialize timestamps for latestProject
  const serializedLatestProject = latestProject ? {
    ...latestProject,
    created_at: latestProject.created_at ? { seconds: latestProject.created_at.seconds, nanoseconds: latestProject.created_at.nanoseconds } : null,
    updated_at: latestProject.updated_at ? { seconds: latestProject.updated_at.seconds, nanoseconds: latestProject.updated_at.nanoseconds } : null,
  } : null;

  const updates = await getLatestUpdates(3);
  // Serialize timestamps for updates
  const serializedUpdates = updates.map(u => ({
    ...u,
    created_at: u.created_at ? { seconds: u.created_at.seconds, nanoseconds: u.created_at.nanoseconds } : null
  }));

  return (
    <div className="bg-black min-h-screen w-full flex flex-col items-center justify-start">

      <Hero
        headline={heroContent?.headline}
        body={heroContent?.body}
      />

      {serializedLatestProject && (
        <section className="w-full py-20 px-6 bg-[#0f0f0f]">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-3xl font-bold text-white">Latest Project</h2>
              <div className="h-px flex-grow bg-gray-800"></div>
              <Link href="/projects" className="text-blue-400 hover:text-blue-300 flex items-center gap-2 text-sm font-medium transition-colors">
                View All <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-800 group">
                <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img
                  src={serializedLatestProject.main_image}
                  alt={serializedLatestProject.title}
                  className="w-full aspect-video object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="space-y-6">
                <h3 className="text-4xl font-bold text-white">{serializedLatestProject.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  {serializedLatestProject.summary}
                </p>
                <div className="flex flex-wrap gap-2">
                  {serializedLatestProject.technologies?.slice(0, 4).map(tech => (
                    <span key={tech} className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full border border-gray-700">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="pt-4">
                  <Link
                    href={`/projects/${serializedLatestProject.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded hover:bg-gray-200 transition-colors"
                  >
                    View Project <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <LatestUpdates updates={serializedUpdates as any} />

    </div>
  )
}
