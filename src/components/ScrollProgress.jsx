import React from "react";
import { motion, useScroll, useSpring } from "motion/react";

// Thin violet bar at the top of the page that fills as you scroll
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed left-0 right-0 top-0 z-50 h-1 bg-gradient-to-r from-[var(--violet)] via-violet-400 to-amber-300"
    />
  );
};

export default ScrollProgress;
