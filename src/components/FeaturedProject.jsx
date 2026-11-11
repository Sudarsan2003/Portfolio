import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { FaExternalLinkAlt, FaGithub, FaArrowRight, FaCheck } from "react-icons/fa";
import { FEATURED_PROJECT as P } from "../constants";

const RagScene = lazy(() => import("./three/RagScene.jsx"));

// Only run the WebGL loop while the scene is on screen
const useInView = (ref, margin = "200px") => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: margin });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [ref, margin]);
  return inView;
};

const FeaturedProject = () => {
  const sceneRef = useRef(null);
  const shotRef = useRef(null);
  const inView = useInView(sceneRef);

  // Screenshot lies back in 3D and stands up as you scroll to it
  const { scrollYProgress } = useScroll({ target: shotRef, offset: ["start end", "center center"] });
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 1], [38, 0]), { stiffness: 120, damping: 24 });
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [0.86, 1]), { stiffness: 120, damping: 24 });
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);

  return (
    <div className="border-b border-[var(--line)] pb-24">
      <div className="mt-20 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-eyebrow text-xs uppercase tracking-[0.35em] text-[var(--violet)]"
        >
          {"// featured-project"}
        </motion.span>
      </div>
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -60 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-display mb-12 mt-4 text-center text-3xl uppercase tracking-tight text-[var(--ink)] lg:text-4xl"
      >
        Meet <span className="text-[var(--violet)]">{P.name}</span>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 60, rotateX: -12 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformPerspective: 1400 }}
        className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d0b1a] text-white shadow-[0_40px_120px_-40px_rgba(124,58,237,0.55)]"
      >
        {/* ambient glows */}
        <div aria-hidden className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-600/30 blur-[120px]" />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-amber-400/20 blur-[120px]" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />

        <div className="relative grid grid-cols-1 gap-4 p-6 sm:p-10 lg:grid-cols-2 lg:gap-10 lg:p-14 [&>*]:min-w-0">
          {/* copy */}
          <div className="flex flex-col justify-center">
            <span className="font-eyebrow mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-amber-200">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-300" />
              Retrieval-Augmented Generation
            </span>
            <h3 className="font-display text-3xl leading-tight sm:text-4xl">{P.title}</h3>
            <p className="mt-3 text-lg italic text-amber-100/80">{P.tagline}</p>
            <p className="mt-5 leading-relaxed text-white/70">{P.description}</p>

            <ul className="mt-6 space-y-3">
              {P.highlights.map((h, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                  className="flex gap-3 text-sm leading-relaxed text-white/80"
                >
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#f97366]/20 text-[#f97366]">
                    <FaCheck className="text-[9px]" />
                  </span>
                  {h}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* 3D scene */}
          <div ref={sceneRef} className="relative h-[340px] sm:h-[420px] lg:h-auto lg:min-h-[480px]">
            {inView && (
              <Suspense fallback={null}>
                <RagScene active={inView} />
              </Suspense>
            )}
            <div className="font-eyebrow pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.3em] text-white/40">
              documents → vectors → answers
            </div>
          </div>
        </div>

        {/* pipeline */}
        <div className="relative px-6 sm:px-10 lg:px-14">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {P.pipeline.map((step, i) => (
              <React.Fragment key={step}>
                <motion.div
                  initial={{ opacity: 0, y: 20, rotateY: -60 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  style={{ transformPerspective: 600 }}
                  className="font-ui flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm backdrop-blur"
                >
                  <span className="font-eyebrow text-[10px] text-amber-300">0{i + 1}</span>
                  {step}
                </motion.div>
                {i < P.pipeline.length - 1 && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.3 }}
                    className="text-white/30"
                  >
                    <FaArrowRight className="text-xs" />
                  </motion.span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* screenshot in a 3D browser frame */}
        <div ref={shotRef} className="relative px-4 pb-10 pt-10 sm:px-10 lg:px-14" style={{ perspective: 1600 }}>
          <motion.div
            style={{ rotateX, scale, y, transformOrigin: "center bottom" }}
            className="overflow-hidden rounded-2xl border border-white/15 bg-[#14112a] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
          >
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="font-eyebrow ml-4 truncate rounded-md bg-white/5 px-3 py-1 text-[11px] text-white/50">
                learnmate · new chat
              </span>
            </div>
            <img src={P.image} alt="LearnMate chat interface" className="block w-full" loading="lazy" />
          </motion.div>
        </div>

        {/* stack + links */}
        <div className="relative flex flex-col gap-6 border-t border-white/10 px-6 py-8 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-14">
          <div className="flex flex-wrap gap-2">
            {P.technologies.map((t) => (
              <span key={t} className="font-ui rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
                {t}
              </span>
            ))}
          </div>
          <div className="flex flex-shrink-0 gap-3">
            {P.demo && (
              <a
                href={P.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="font-ui inline-flex items-center gap-2 rounded-full bg-amber-300 px-5 py-2.5 text-sm font-semibold text-[#1a1406] transition hover:bg-amber-200"
              >
                Live Demo <FaExternalLinkAlt className="text-xs" />
              </a>
            )}
            {P.github && (
              <a
                href={P.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-ui inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <FaGithub /> Source
              </a>
            )}
            {!P.demo && !P.github && (
              <span className="font-ui inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm text-white/60">
                Live demo coming soon
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FeaturedProject;
