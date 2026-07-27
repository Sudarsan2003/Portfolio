import React from 'react';
import { motion } from 'framer-motion';
import { EDUCATION } from '../constants';
import { FaSchool, FaGraduationCap, FaBook, FaCalendarAlt } from "react-icons/fa";

const Education = () => {
  return (
    <div className="border-b border-[var(--line)] pb-4">
      <div className="mt-20 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="font-eyebrow text-xs uppercase tracking-[0.35em] text-[var(--violet)]"
        >
          {'// education'}
        </motion.span>
      </div>
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
        className="font-display mb-16 mt-4 text-center text-3xl uppercase tracking-tight text-[var(--ink)] lg:text-4xl"
      >
        Education
      </motion.h2>
      <div style={{ perspective: 1200 }}>
        {EDUCATION.map((edu, index) => (
          <motion.div
            key={index}
            whileInView={{ opacity: 1, rotateX: 0 }}
            initial={{ opacity: 0, rotateX: index % 2 === 0 ? -30 : 30 }}
            transition={{ duration: 0.9 }}
            style={{ transformStyle: 'preserve-3d' }}
            className="relative mb-8 flex flex-wrap rounded-2xl border border-[var(--line)] bg-white/60 p-6 lg:justify-center"
          >
            <span className="absolute right-6 top-6 font-eyebrow text-xs tracking-widest text-[var(--ink-soft)]/60">
              {String(index + 1).padStart(3, '0')}
            </span>
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -100 }}
              transition={{ duration: 1 }}
              className="w-full lg:w-1/4"
              style={{ transform: 'translateZ(25px)' }}
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--line)] bg-[var(--violet-soft)] shadow-sm">
                {index === 0 && <FaGraduationCap className="text-3xl text-[var(--violet)]" />}
                {index === 1 && <FaBook className="text-3xl text-[var(--violet)]" />}
                {index === 2 && <FaSchool className="text-3xl text-[var(--violet)]" />}
                {index === 3 && <FaSchool className="text-3xl text-[var(--violet)]" />}
              </div>

              <p className="mb-6 flex items-center gap-2 rounded font-eyebrow text-sm text-[var(--ink-soft)]">
                <FaCalendarAlt className="text-[var(--violet)]" /> {edu.year}
              </p>
            </motion.div>

            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 100 }}
              transition={{ duration: 1 }}
              className="w-full max-w-xl lg:w-3/4"
            >
              <h6 className="mb-2 font-semibold text-[var(--ink)]">{edu.studiedAt}</h6>
              <p className="mb-4 text-[var(--ink-soft)]">{edu.qualification}</p>
              <p className="mb-4 text-[var(--ink-soft)]">{edu.cgpa}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Education;