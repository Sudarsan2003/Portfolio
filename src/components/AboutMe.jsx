import React from 'react'
import aboutImg from '../assets/about.jpg'
import { ABOUT_TEXT } from '../constants'
import { motion } from "motion/react"
import { FaUserAstronaut } from "react-icons/fa"

const AboutMe = () => {
  return (
    <div className='border-b border-[var(--line)] pb-4'>
      <div className='mt-20 text-center'>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className='font-eyebrow text-xs uppercase tracking-[0.35em] text-[var(--violet)]'
        >
          {'// about-me'}
        </motion.span>
      </div>
      <h2 className='font-display mb-16 mt-4 flex items-center justify-center gap-3 text-center text-3xl uppercase tracking-tight text-[var(--ink)] lg:text-4xl'>
        <span className='flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--line)] bg-[var(--violet-soft)] text-[var(--violet)]'>
          <FaUserAstronaut className='text-lg' />
        </span>
        A Curious Mind
        <span className='text-[var(--ink-soft)]'>Building the Future</span>
      </h2>
      <div className='flex flex-wrap'>
        <motion.div
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          initial={{ opacity: 0, x: -100, rotateY: -40 }}
          transition={{ duration: 0.8 }}
          style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
          className='w-full lg:w-1/2 lg:p-8'
        >
          <div className='flex items-center justify-center'>
            <img
              className='rounded-2xl border border-[var(--line)] shadow-xl shadow-violet-500/10'
              src={aboutImg}
              alt='About'
            />
          </div>
        </motion.div>
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
          className='w-full lg:w-1/2'
        >
          <div className='flex justify-center lg:justify-start'>
            <p className='my-2 max-w-xl whitespace-pre-line py-6 leading-relaxed text-[var(--ink-soft)]'>
              {ABOUT_TEXT}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AboutMe