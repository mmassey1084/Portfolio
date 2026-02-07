export default function ProjectCard({ projectItem, onOpenProject }) {
  return (
    <button
      type="button"
      className="card"
      style={{ textAlign: "left" }}
      onClick={() => onOpenProject(projectItem)}
      aria-label={`Open project: ${projectItem.title}`}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
        <strong>{projectItem.title}</strong>
        <span style={{ color: "var(--muted)", fontFamily: "var(--mono)", fontSize: 12 }}>
          {projectItem.year}
        </span>
      </div>

      <p style={{ marginTop: 8 }}>{projectItem.summary}</p>

      <div className="pills">
        {projectItem.tags.map((tagLabel) => (
          <span key={tagLabel} className="pill">
            {tagLabel}
          </span>
        ))}
      </div>
    </button>
  );
}
