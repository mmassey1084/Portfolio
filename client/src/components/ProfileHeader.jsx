import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { profileData } from "../data/profile.js";
import GlitchType from "../components/GlitchType.jsx";

export default function ProfileHeader() {
  const {
    name,
    headline,
    location,
    tagline,
    avatarPath,
    resumeDownloadUrl,
    recommendationLetterUrl,
    links,
    phonePath,
  } = profileData;

  const headerRef = useRef(null);

 
  const [inView, setInView] = useState(false);
  const [cycle, setCycle] = useState(0);


  const aboutText = "ABOUT";
  const aboutSpeed = 280;
  const aboutStartDelay = 0; 

 
  const meSpeed = 280;
  const meStartDelay = useMemo(() => {
    const aboutTypingMs = aboutText.length * aboutSpeed;
    return aboutStartDelay + aboutTypingMs + 120;
  }, []);

  
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        threshold: 0.25, 
        rootMargin: "0px 0px -10% 0px",
      }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  
  useEffect(() => {
    if (inView) {
      setCycle((c) => c + 1);
    }
  }, [inView]);

  
  useEffect(() => {
    if (!inView) return;

    const id = setInterval(() => setCycle((c) => c + 1), 15000);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <section className="panel" ref={headerRef}>
      <div className="panel__inner">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <h1 className="h1">
            <GlitchType
              text="ABOUT"
              restartKey={cycle}
              speed={aboutSpeed}
              startDelay={aboutStartDelay}
              glitchTail={4}
              blinkCursor={false}
            />

            <span aria-hidden="true"> </span>

            <span className="accent">
              <GlitchType
                text="ME"
                restartKey={cycle}
                speed={meSpeed}
                startDelay={meStartDelay}
                glitchTail={5}
                blinkCursor={false}
              />
            </span>
          </h1>

          <div
            style={{
              color: "var(--muted)",
              fontFamily: "var(--mono)",
              marginTop: 6,
            }}
          >
            ALLOW ME TO INTRODUCE MYSELF.
          </div>
          <hr className="rule" />
        </motion.div>

        <div style={{ marginTop: 16 }} className="profile">
          {/* Avatar */}
          <div className="avatar" title="Profile photo">
            <img
              src={avatarPath}
              alt={`${name} profile`}
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          </div>

          {/* Text + Buttons */}
          <div style={{ flex: 1, minWidth: 260 }}>
            <div className="kv">
              <strong style={{ fontSize: 18 }}>{name}</strong>
              <small>{headline}</small>
              <small>{location}</small>
            </div>

            <p className="sub" style={{ marginBottom: 0 }}>
              {tagline}
            </p>

            <div className="pills" aria-label="Quick facts">
              <span className="pill">Open to relocate</span>
              <span className="pill">React + JavaScript</span>
              <span className="pill">UI + Accessibility</span>
              <span className="pill">APIs + Node/Express</span>
            </div>

            <div className="btn-row">
              <a className="btn btn-primary" href={resumeDownloadUrl} download>
                Download Resume
              </a>

              <a
                className="btn btn-primary"
                href={recommendationLetterUrl}
                download
              >
                Download Recommendation Letter
              </a>

              <a
                className="btn"
                href={links.githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub /> GitHub
              </a>

              <a
                className="btn"
                href={links.linkedInUrl}
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin /> LinkedIn
              </a>
            </div>
          </div>

          {/* Phone on right */}
          <div className="phone-wrap">
            <img
              src={phonePath}
              alt="phone preview"
              className="phone-img"
              onMouseEnter={() => document.body.classList.add("phone-hover")}
              onMouseLeave={() => document.body.classList.remove("phone-hover")}
            />
          </div>
        </div>
      </div>
    </section>
  );
}


