import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { profileData } from "../data/profile.js";

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
  } = profileData;

  return (
    <section className="panel">
      <div className="panel__inner">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <h1 className="h1">
            ABOUT <span className="accent">ME</span>
          </h1>
          <div style={{ color: "var(--muted)", fontFamily: "var(--mono)", marginTop: 6 }}>
            ALLOW ME TO INTRODUCE MYSELF.
          </div>
          <hr className="rule" />
        </motion.div>

        <div style={{ marginTop: 16 }} className="profile">
          <div className="avatar" title="Profile photo">
            <img
              src={avatarPath}
              alt={`${name} profile`}
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          </div>

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

              <a className="btn btn-primary" href={recommendationLetterUrl} download>
                Download Recommendation Letter
              </a>

              <a className="btn" href={links.githubUrl} target="_blank" rel="noreferrer">
                <FaGithub /> GitHub
              </a>

              <a className="btn" href={links.linkedInUrl} target="_blank" rel="noreferrer">
                <FaLinkedin /> LinkedIn
              </a>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
