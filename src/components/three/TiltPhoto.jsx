import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

// Wraps a background-removed (transparent) photo in a mouse-reactive 3D tilt.
// No border, no card frame - just the cutout floating with a soft glow behind it.
const TiltPhoto = ({ src, alt }) => {
  const ref = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 150,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 150,
    damping: 18,
  });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div style={{ perspective: 1200 }} className="relative flex justify-center">
      {/* Soft ambient glow behind the cutout, no hard edges, no frame */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.20), rgba(167,139,250,0.12) 55%, transparent 75%)",
        }}
      />

      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        <motion.img
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          src={src}
          alt={alt}
          style={{
            transform: "translateZ(20px)",
            filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.18))",
          }}
          className="relative max-h-[480px] w-auto select-none"
          draggable={false}
        />
      </motion.div>
    </div>
  );
};

export default TiltPhoto;