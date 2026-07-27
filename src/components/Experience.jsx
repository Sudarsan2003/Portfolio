import React from 'react'
import { motion } from 'framer-motion'
import { EXPERIENCES } from '../constants'
import { FaBriefcase, FaBuilding, FaCalendarAlt } from 'react-icons/fa'

const Experience = () => {
  return (
    <div className='border-b border-[var(--line)] pb-4'>
      <div className='mt-20 text-center'>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className='font-eyebrow text-xs uppercase tracking-[0.35em] text-[var(--violet)]'
        >
          {'// experience'}
        </motion.span>
      </div>
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
        className="font-display mb-16 mt-4 text-center text-3xl uppercase tracking-tight text-[var(--ink)] lg:text-4xl"
      >
        Experience
      </motion.h2>

      <div className='mx-auto flex max-w-4xl flex-col gap-6 px-4'>
        {EXPERIENCES.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className='relative flex gap-5 rounded-2xl border border-[var(--line)] bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-[0_0_40px_-15px_rgba(124,58,237,0.35)]'
          >
            <div className='flex flex-shrink-0 flex-col items-center'>
              <div className='flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--line)] bg-[var(--violet-soft)] text-[var(--violet)] shadow-sm'>
                <FaBuilding className='text-2xl' />
              </div>
              {index !== EXPERIENCES.length - 1 && (
                <span className='mt-2 hidden w-px flex-1 bg-[var(--line)] sm:block' />
              )}
            </div>

            <div className='min-w-0 flex-1'>
              <div className='flex flex-wrap items-start justify-between gap-3'>
                <div>
                  <h6 className='flex items-center gap-2 text-lg font-semibold text-[var(--ink)]'>
                    <FaBriefcase className='text-[var(--violet)]' /> {exp.role}
                  </h6>
                  <p className='mt-1 text-[var(--ink-soft)]'>{exp.company}</p>
                </div>
                <span className='flex items-center gap-2 rounded-full border border-[var(--line)] px-3 py-1 font-eyebrow text-xs text-[var(--ink-soft)]'>
                  <FaCalendarAlt className='text-[var(--violet)]' /> {exp.year}
                </span>
              </div>

              <p className='mt-4 text-[var(--ink-soft)]'>{exp.description}</p>

              <div className='mt-4 flex flex-wrap gap-2'>
                {exp.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className='font-ui rounded-full border border-[var(--violet)]/30 bg-[var(--violet-soft)] px-2.5 py-1 text-sm font-medium text-[var(--violet)]'
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Experience