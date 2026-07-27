import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TECHNOLOGIES } from "../constants";

import {
  SiHtml5,
  SiJavascript,
  SiReact,
  SiRedux,
  SiTailwindcss,
  SiMui,
  SiBootstrap,
  SiPython,
  SiFastapi,
  SiFlask,
  SiSpringboot,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiSqlite,
  SiTensorflow,
  SiKeras,
  SiScikitlearn,
  SiLangchain,
  SiOpencv,
  SiDocker,
  SiGit,
  SiGithub,
  SiJsonwebtokens,
  SiFirebase,
} from "react-icons/si";
import { FaJava, FaCss3Alt, FaCode, FaEye, FaLanguage, FaCube } from "react-icons/fa";
import { TbApi } from "react-icons/tb";

// Maps a technology name to its icon component. Falls back to a generic
// glyph for tools that don't ship a dedicated brand mark.
const ICONS = {
  HTML5: SiHtml5,
  CSS3: FaCss3Alt,
  "JavaScript (ES6+)": SiJavascript,
  "React.js": SiReact,
  Redux: SiRedux,
  "Tailwind CSS": SiTailwindcss,
  "Material UI": SiMui,
  Bootstrap: SiBootstrap,
  Java: FaJava,
  "Spring Boot": SiSpringboot,
  Python: SiPython,
  FastAPI: SiFastapi,
  Flask: SiFlask,
  "REST APIs": TbApi,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  SQLite: SiSqlite,
  pgvector: FaCube,
  ChromaDB: FaCube,
  TensorFlow: SiTensorflow,
  Keras: SiKeras,
  "Scikit-Learn": SiScikitlearn,
  LangChain: SiLangchain,
  OpenCV: SiOpencv,
  "Grad-CAM": FaEye,
  NLP: FaLanguage,
  Docker: SiDocker,
  Git: SiGit,
  GitHub: SiGithub,
  "JWT Authentication": SiJsonwebtokens,
  Firebase: SiFirebase,
};

// App-icon style badge: icon in a rounded square tile, label underneath.
// Mirrors the "macOS folder icon" language used across the rest of the site.
const TechBadge = ({ name, accent, index }) => {
  const Icon = ICONS[name] || FaCode;
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.95 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.35) }}
      whileHover={{ y: -4 }}
      className="group flex flex-col items-center gap-2.5"
    >
      <div
        className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--line)] bg-white shadow-[0_6px_16px_-8px_rgba(0,0,0,0.15)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_14px_28px_-12px_var(--tint)]"
        style={{ "--tint": `${accent}55` }}
      >
        <Icon
          className="text-3xl transition-transform duration-300 group-hover:scale-110"
          style={{ color: accent }}
        />
      </div>
      <span className="font-ui text-center text-xs font-semibold uppercase tracking-wide text-[var(--ink)]">
        {name}
      </span>
    </motion.div>
  );
};

const Technologies = () => {
  const [active, setActive] = useState(TECHNOLOGIES[0].category);
  const current = TECHNOLOGIES.find((t) => t.category === active) ?? TECHNOLOGIES[0];

  return (
    <div id="technologies" className="scroll-mt-24 border-b border-[var(--line)] pb-24">
      <div className="mb-4 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-eyebrow text-xs uppercase tracking-[0.35em] text-[var(--violet)]"
        >
          {"// tech-stack"}
        </motion.span>
      </div>
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -60 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="font-display mb-10 text-center text-3xl uppercase tracking-tight text-[var(--ink)] lg:text-4xl"
      >
        Technologies
      </motion.h2>

      {/* category tabs, echoing the pill nav language */}
      <div className="mb-12 flex justify-center">
        <div className="flex flex-wrap justify-center gap-1 rounded-full border border-[var(--line)] bg-white p-1.5 shadow-sm">
          {TECHNOLOGIES.map((group) => (
            <button
              key={group.category}
              onClick={() => setActive(group.category)}
              className={`font-ui rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active === group.category
                  ? "bg-[var(--ink)] text-white"
                  : "text-[var(--ink-soft)] hover:bg-[var(--violet-soft)] hover:text-[var(--violet)]"
              }`}
            >
              {group.category}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.category}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-3 gap-x-6 gap-y-8 sm:grid-cols-4 md:grid-cols-5"
          >
            {current.items.map((name, i) => (
              <TechBadge key={name} name={name} accent={current.accent} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Technologies;