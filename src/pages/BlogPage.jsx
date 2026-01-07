import PanelSection from "../components/PanelSection.jsx";

export default function BlogPage() {
  return (
    <div className="grid" style={{ gap: 16 }}>
      <PanelSection title="Blog">
        <div className="card">
          <strong>Coming soon</strong>
          <p>Add posts later (Markdown, a CMS, or hardcoded cards).</p>
        </div>
      </PanelSection>
    </div>
  );
}
