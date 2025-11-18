'use client'
import React from 'react'
import { motion, Variants } from 'framer-motion'

const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297 24 5.67 18.627.297 12 .297z"/>
  </svg>
)

const MailIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/>
  </svg>
)

export default function ContactPage() {
  const contacts = [
    {
      icon: <MailIcon className="w-8 h-8" />,
      label: 'Email',
      value: 'joseph@josephmatthewhall.com',
      href: 'mailto:joseph@josephmatthewhall.com',
    },
    {
      icon: <GithubIcon className="w-8 h-8" />,
      label: 'GitHub',
      value: 'josephmatthall',
      href: 'https://github.com/josephmatthall',
    },
  ]

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <div className="bg-gray-800/80 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-lg w-full max-w-2xl text-center">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl font-bold text-white mb-2">Get In Touch</h1>
        <p className="text-gray-300 mb-8">Feel free to reach out.</p>
      </motion.div>

      <motion.div 
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {contacts.map((contact, index) => (
          <motion.a
            key={index}
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-4 bg-gray-700/70 rounded-xl hover:bg-gray-700/90 transition-all duration-300 group"
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-cyan-400 mr-4 group-hover:scale-110 transition-transform">
              {contact.icon}
            </div>
            <div className="text-left">
              <div className="font-semibold text-white">{contact.label}</div>
              <div className="text-gray-300 group-hover:text-cyan-300 transition-colors">{contact.value}</div>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </div>
  )
}
