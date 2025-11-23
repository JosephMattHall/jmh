'use client'
import React, { useState } from 'react'
import { motion, Variants } from 'framer-motion'
import PageLayout from '@/components/PageLayout'
import { Send, Mail, Github } from 'lucide-react'

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
            <h1 className="text-4xl font-bold text-white mb-4">Get in Touch</h1>
            <p className="text-gray-400 leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
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
                <p className="text-white font-medium">joseph@josephmatthewhall.com</p>
              </div>
            </a>

            <a
              href="https://github.com/josephmatthall"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-gray-800/50 border border-gray-700 rounded-xl hover:bg-gray-800 hover:border-purple-500/50 transition-all group"
            >
              <div className="p-3 bg-purple-500/10 text-purple-400 rounded-lg group-hover:scale-110 transition-transform">
                <Github size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-400">GitHub</h3>
                <p className="text-white font-medium">josephmatthall</p>
              </div>
            </a>
          </div>
        </motion.div>

        {/* Right Column: Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-800/30 p-8 rounded-2xl border border-gray-700"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="What's this about?"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                placeholder="Your message here..."
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <Send size={18} />
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </PageLayout>
  )
}
