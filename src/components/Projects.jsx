import React, { useRef } from 'react';
import { PROJECTS } from '../constants';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';

// A project card that tilts in 3D towards the cursor and flips in on scroll
const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      whileInView={{ opacity: 1, rotateX: 0 }}
      initial={{ opacity: 0, rotateX: -35 }}
      transition={{ duration: 0.8 }}
      style={{ perspective: 1200 }}
      className="mb-8 flex w-full flex-wrap lg:justify-center"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="flex w-full flex-wrap rounded-2xl border border-[var(--line)] bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-[0_0_40px_-15px_rgba(124,58,237,0.35)] lg:max-w-4xl"
      >
        <div className="relative w-full lg:w-1/4" style={{ transform: 'translateZ(30px)' }}>
          <span className="absolute -left-2 -top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line)] bg-white font-eyebrow text-xs text-[var(--violet)] shadow-sm">
            {String(index + 1).padStart(2, '0')}
          </span>
          <img
            src={project.image}
            width={150}
            height={150}
            alt={project.title}
            className="mb-6 rounded-2xl border border-[var(--line)] object-cover shadow-lg shadow-black/10"
          />
        </div>

        <div className="w-full max-w-xl lg:w-3/4" style={{ transform: 'translateZ(15px)' }}>
          <h6 className="mb-2 font-semibold text-[var(--ink)]">{project.title}</h6>
          <p className="mb-4 text-[var(--ink-soft)]">{project.description}</p>
          <div className="mb-4">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="font-ui mr-2 mb-2 inline-block rounded-full border border-[var(--violet)]/30 bg-[var(--violet-soft)] px-2.5 py-1 text-sm font-medium text-[var(--violet)]"
              >
                {tech}
              </span>
            ))}
          </div>
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="font-ui mt-2 inline-flex items-center gap-2 rounded-lg bg-[var(--ink)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--violet)]"
            >
              View Demo <FaExternalLinkAlt className="text-xs" />
            </a>
          ) : (
            <span className="font-ui mt-2 inline-flex items-center gap-2 rounded-lg border border-[var(--line)] px-4 py-2 text-sm font-medium text-[var(--ink-soft)]">
              Demo coming soon
            </span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <div className="border-b border-[var(--line)] pb-4">
      <div className="mt-20 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="font-eyebrow text-xs uppercase tracking-[0.35em] text-[var(--violet)]"
        >
          {"// selected-work"}
        </motion.span>
      </div>
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
        className="font-display mb-16 mt-4 text-center text-3xl uppercase tracking-tight text-[var(--ink)] lg:text-4xl"
      >
        Projects
      </motion.h2>
      <div>
        {PROJECTS.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Projects;