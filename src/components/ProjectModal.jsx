import { motion } from "framer-motion";

export default function ProjectModal({ selectedProject, onCloseModal }) {
  if (!selectedProject) return null;

  const { title, role, year, technologyStack, highlights, links } = selectedProject;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <motion.div
        className="modal"
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <div className="modal__inner">
          <div className="modal__top">
            <h3 className="modal__title">{title}</h3>
            <button className="btn" type="button" onClick={onCloseModal}>
              Close
            </button>
          </div>

          <div style={{ color: "var(--muted)", marginTop: 4 }}>
            <strong>{role}</strong> • {year}
          </div>

          <div className="pills">
            {technologyStack.map((stackItem) => (
              <span key={stackItem} className="pill">
                {stackItem}
              </span>
            ))}
          </div>

          <div style={{ marginTop: 10 }}>
            <strong>Highlights</strong>
            <ul style={{ color: "var(--muted)", marginTop: 8 }}>
              {highlights.map((highlightText) => (
                <li key={highlightText}>{highlightText}</li>
              ))}
            </ul>
          </div>

          <div className="btn-row">
            {links?.map((linkItem) => (
              <a
                key={linkItem.url}
                className="btn btn-primary"
                href={linkItem.url}
                target="_blank"
                rel="noreferrer"
              >
                {linkItem.label}
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
