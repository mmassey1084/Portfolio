import PanelSection from "../components/PanelSection.jsx";
import TopNavigation from "../components/TopNavigation.jsx";

export default function BlogPage() {
  return (
    <>
      <TopNavigation />
      <div className="page-content">
        <div className="grid" style={{ gap: 16 }}>
          <PanelSection title="Blog">
            <div className="card">
              <strong>Coming soon</strong>
            </div>
          </PanelSection>
        </div>
      </div>
    </>
  );
}
