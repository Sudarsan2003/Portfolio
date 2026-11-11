import React from 'react'
import { HERO_CONTENT, RESUME_URL, RESUME_FILENAME } from '../constants'
import profilePic from "../assets/profile-headshot.png";
import { motion } from "motion/react"
import HeroScene from "./three/HeroScene.jsx"
import TiltPhoto from "./three/TiltPhoto.jsx"
import { FaArrowDown, FaFileDownload, FaArrowRight } from "react-icons/fa"

const container = (delay) => ({
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: delay },
  },
})

const Hero = () => {
  return (
    <div className='relative isolate overflow-hidden border-b border-[var(--line)] pb-4 lg:mb-35'>
      <HeroScene />
      <div className='flex flex-wrap'>
        <div className='w-full lg:w-1/2'>
          <div className='flex flex-col items-center lg:items-start'>
            <motion.span
              variants={container(0)}
              initial="hidden"
              animate="visible"
              className='mt-4 rounded-full border border-[var(--line)] bg-white px-3 py-1 font-eyebrow text-xs uppercase tracking-[0.35em] text-[var(--violet)] lg:mt-16'
            >
              Hello, I'm Manikantha
            </motion.span>
            <motion.h1
              variants={container(0.15)}
              initial="hidden"
              animate="visible"
              className='font-display pb-6 pt-4 text-5xl uppercase leading-[0.95] tracking-tight text-[var(--ink)] lg:text-7xl'
            >
              Full Stack
              <br />
              <span className='text-[var(--violet)]'>Developer</span>
            </motion.h1>
            <motion.span
              variants={container(0.5)}
              initial="hidden"
              animate="visible"
              className='font-ui text-2xl font-semibold tracking-tight text-[var(--ink-soft)]'
            >
              AI / ML &middot; React &middot; Spring Boot
            </motion.span>
            <motion.p
              variants={container(1)}
              initial="hidden"
              animate="visible"
              className='my-2 max-w-xl py-6 font-light leading-relaxed text-[var(--ink-soft)]'
            >
              {HERO_CONTENT}
            </motion.p>
            <motion.div
              variants={container(1.15)}
              initial="hidden"
              animate="visible"
              className='mb-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start'
            >
              <a
                href={RESUME_URL}
                download={RESUME_FILENAME}
                className='font-ui group inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 hover:bg-[var(--violet)]'
              >
                <FaFileDownload className='transition group-hover:translate-y-0.5' /> Download Resume
              </a>
              <a
                href='#learnmate'
                className='font-ui group inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white px-6 py-3 text-sm font-semibold text-[var(--ink)] shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--violet)]/40 hover:text-[var(--violet)]'
              >
                See LearnMate <FaArrowRight className='text-xs transition group-hover:translate-x-1' />
              </a>
            </motion.div>
            <motion.a
              href="#about"
              variants={container(1.3)}
              initial="hidden"
              animate="visible"
              className='hidden items-center gap-3 lg:flex'
            >
              <span className='flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-white text-[var(--violet)] shadow-sm'>
                <FaArrowDown className='animate-bounce text-sm' />
              </span>
              <span className='font-eyebrow text-xs uppercase tracking-[0.2em] text-[var(--ink-soft)]'>
                Scroll to explore
              </span>
            </motion.a>
          </div>
        </div>
        <div className='w-full lg:w-1/2 lg:p-8'>
          <div className='flex justify-center'>
            <TiltPhoto src={profilePic} alt='profile' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero