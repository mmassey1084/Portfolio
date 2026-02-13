import React from "react";
import { motion } from "framer-motion";
import HeroName from "./HeroName.jsx";

export default function EntryHero({ entryRef, onScrollToContent, heroSrc }) {
  const droplets = Array.from({ length: 12 });

  return (
    <section ref={entryRef} className="entry">
      <div className="entry-content">
  
          {/* photo */}
          <motion.img
            src={heroSrc}
            alt="coding photo"
            className="hero-img hero-img--splatter"
            initial={{ scale: 0.88, opacity: 0, y: 10 }}
            animate={{ scale: [0.88, 1.06, 1], opacity: 1, y: [10, -2, 0] }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.14 }}
          />
       

        <HeroName />
      </div>

      <button className="scroll-btn" onClick={onScrollToContent}>
        View My Work ↓
      </button>
    </section>
  );
}
