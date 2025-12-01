'use client'
import React, { useState } from 'react'
import { motion, Variants } from 'framer-motion'
import PageLayout from '@/components/PageLayout'
import { Send, Mail, Github } from 'lucide-react'

import { siteContent } from "@/lib/siteContent"

export default function ContactPage() {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const mailtoLink = `mailto:joseph@josephmatthewhall.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`
    window.location.href = mailtoLink
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  }

  return (
    <PageLayout title="Contact Me">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">{siteContent.contact.headline}</h1>
            <p className="text-gray-400 leading-relaxed">
              {siteContent.contact.body}
            </p>
          </div>

          <div className="space-y-4">
            <a
              href="mailto:joseph@josephmatthewhall.com"
              className="flex items-center p-4 bg-gray-800/50 border border-gray-700 rounded-xl hover:bg-gray-800 hover:border-blue-500/50 transition-all group"
            >
              <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg group-hover:scale-110 transition-transform">
                <Mail size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-400">Email</h3>
                <p className="text-white font-medium">{siteContent.email}</p>
              </div>
            </a>

            <a
              href={siteContent.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-gray-800/50 border border-gray-700 rounded-xl hover:bg-gray-800 hover:border-purple-500/50 transition-all group"
            >
              <div className="p-3 bg-purple-500/10 text-purple-400 rounded-lg group-hover:scale-110 transition-transform">
                <Github size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-400">GitHub</h3>
                <p className="text-white font-medium">{siteContent.github.username}</p>
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  )
}
