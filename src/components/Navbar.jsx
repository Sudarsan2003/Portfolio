import React, { useState } from 'react'
import logo from '../assets/logo.png';
import { FaLinkedin, FaGithub, FaBars, FaTimes, FaFileDownload } from 'react-icons/fa'
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagram } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Technologies', href: '#technologies' },
  { label: 'Education', href: '#education' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

const SOCIALS = [
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/lvn-manikantha-sudarshan-annaluru-010717210/' },
  { icon: FaGithub, href: 'https://github.com/Sudarsan2003' },
  { icon: FaInstagram, href: '#' },
  { icon: FaSquareXTwitter, href: '#' },
]

const Navbar = () => {
  const [active, setActive] = useState('#home')
  const [menuOpen, setMenuOpen] = useState(false)

  const handleClick = (href) => {
    setActive(href)
    setMenuOpen(false)
  }

  return (
    <nav className='sticky top-4 z-40 mb-16 pt-6'>
      <div className='flex items-center justify-between gap-4'>
        {/* monogram / logo badge */}
        <motion.a
          href="#home"
          onClick={() => handleClick('#home')}
          whileHover={{ rotateY: 20, rotateX: -8, scale: 1.06 }}
          transition={{ type: 'spring', stiffness: 200, damping: 12 }}
          style={{ transformStyle: 'preserve-3d' }}
          className='relative flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[var(--line)] shadow-sm'
        >
          <div className='absolute inset-0 bg-gradient-to-br from-[var(--violet)] to-[var(--violet)]/60' />
          <div className='absolute inset-0 rounded-2xl [clip-path:polygon(0_0,100%_0,0_100%)] bg-white' />
          <img className='relative z-10 h-7 w-7 rounded-full object-cover' src={logo} alt='' />
        </motion.a>

        {/* desktop pill nav */}
        <div className='hidden flex-1 justify-center lg:flex'>
          <ul className='flex items-center gap-1 rounded-full border border-[var(--line)] bg-white/90 px-2 py-2 text-sm font-medium text-[var(--ink-soft)] shadow-[0_2px_20px_-8px_rgba(0,0,0,0.15)] backdrop-blur-sm'>
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => handleClick(link.href)}
                  className={`font-ui inline-block rounded-full px-4 py-2 transition-colors ${
                    active === link.href
                      ? 'bg-[var(--ink)] text-white'
                      : 'hover:bg-[var(--violet-soft)] hover:text-[var(--violet)]'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className='flex items-center gap-3'>
          {/* social icons, each its own circular button */}
          <div className='hidden items-center gap-2 sm:flex'>
            {SOCIALS.map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className='flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-white text-[var(--ink-soft)] shadow-sm transition-colors hover:border-[var(--violet)]/40 hover:bg-[var(--violet-soft)] hover:text-[var(--violet)]'
              >
                <Icon />
              </a>
            ))}
          </div>

          {/* CV button, circular like the reference's top-right control */}
          <a
            href="/resume.pdf"
            download
            title="Download CV"
            className='flex h-12 w-12 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--ink)] text-white shadow-sm transition-transform hover:scale-105'
          >
            <FaFileDownload />
          </a>

          {/* mobile menu toggle */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className='flex h-12 w-12 items-center justify-center rounded-full border border-[var(--line)] bg-white text-[var(--ink)] shadow-sm lg:hidden'
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.25 }}
            className='mt-4 flex flex-col gap-1 overflow-hidden rounded-2xl border border-[var(--line)] bg-white p-2 shadow-lg lg:hidden'
          >
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => handleClick(link.href)}
                  className={`font-ui block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    active === link.href
                      ? 'bg-[var(--ink)] text-white'
                      : 'text-[var(--ink-soft)] hover:bg-[var(--violet-soft)] hover:text-[var(--violet)]'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar