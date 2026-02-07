import React from "react";
import { motion } from "framer-motion";
import HeroName from "./HeroName.jsx";

export default function EntryHero({ entryRef, onScrollToContent, heroSrc }) {
  const droplets = Array.from({ length: 12 });

  return (
    <section ref={entryRef} className="entry">
      <div className="entry-content">
        <div className="hero-splatter">
          {/* splatter blobs behind */}
          <motion.span
            className="splatter splatter--a"
            initial={{ scale: 0.25, opacity: 0, rotate: -25 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            aria-hidden="true"
          />
          <motion.span
            className="splatter splatter--b"
            initial={{ scale: 0.2, opacity: 0, rotate: 30 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.06 }}
            aria-hidden="true"
          />
          <motion.span
            className="splatter splatter--c"
            initial={{ scale: 0.2, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
            aria-hidden="true"
          />

          {/* droplet burst */}
          {droplets.map((_, i) => (
            <motion.span
              key={i}
              className="droplet"
              style={{
                "--a": `${(360 / droplets.length) * i}deg`,
                "--d": `${110 + (i % 4) * 18}px`,
                "--s": `${6 + (i % 5) * 2}px`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.28,
                ease: "easeOut",
                delay: 0.12 + i * 0.01,
              }}
              aria-hidden="true"
            />
          ))}

          {/* photo */}
          <motion.img
            src={heroSrc}
            alt="coding photo"
            className="hero-img hero-img--splatter"
            initial={{ scale: 0.88, opacity: 0, y: 10 }}
            animate={{ scale: [0.88, 1.06, 1], opacity: 1, y: [10, -2, 0] }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.14 }}
          />
        </div>

        <HeroName />
      </div>

      <button className="scroll-btn" onClick={onScrollToContent}>
        View My Work ↓
      </button>
    </section>
  );
}
