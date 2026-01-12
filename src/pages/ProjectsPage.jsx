import { useMemo, useState, useEffect } from "react";
import PanelSection from "../components/PanelSection.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import ProjectModal from "../components/ProjectModal.jsx";
import { projectItems } from "../data/projects.js";
import TopNavigation from "../components/TopNavigation.jsx";

export default function ProjectsPage() {
  const [searchQueryText, setSearchQueryText] = useState("");
  const [activeTagFilter, setActiveTagFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

   useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, []);

  const availableTagOptions = useMemo(() => {
    const uniqueTagSet = new Set();
    projectItems.forEach((projectItem) =>
      projectItem.tags.forEach((tagLabel) => uniqueTagSet.add(tagLabel))
    );
    return ["All", ...Array.from(uniqueTagSet)];
  }, []);

  const filteredProjectItems = useMemo(() => {
    const normalizedQuery = searchQueryText.trim().toLowerCase();

    return projectItems.filter((projectItem) => {
      const matchesTagFilter =
        activeTagFilter === "All" || projectItem.tags.includes(activeTagFilter);

      const matchesSearchQuery =
        !normalizedQuery ||
        projectItem.title.toLowerCase().includes(normalizedQuery) ||
        projectItem.summary.toLowerCase().includes(normalizedQuery) ||
        projectItem.technologyStack
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesTagFilter && matchesSearchQuery;
    });
  }, [searchQueryText, activeTagFilter]);

  return (
    <>
      <TopNavigation />
      <div className="page-content">
        <div className="grid" style={{ gap: 16 }}>
          <TopNavigation />
          <PanelSection title="Projects">
            <div className="grid" style={{ gap: 12 }}>
              <div className="grid" style={{ gap: 10 }}>
                <label className="label" htmlFor="projectSearchInput">
                  Search
                </label>
                <input
                  id="projectSearchInput"
                  className="input"
                  value={searchQueryText}
                  onChange={(event) => setSearchQueryText(event.target.value)}
                  placeholder="Search by title, stack, or keywords..."
                />

                <label className="label" htmlFor="tagFilterSelect">
                  Filter by tag
                </label>
                <select
                  id="tagFilterSelect"
                  className="input"
                  value={activeTagFilter}
                  onChange={(event) => setActiveTagFilter(event.target.value)}
                >
                  {availableTagOptions.map((tagOption) => (
                    <option key={tagOption} value={tagOption}>
                      {tagOption}
                    </option>
                  ))}
                </select>
              </div>

              <div className="project-grid">
                {filteredProjectItems.map((projectItem) => (
                  <ProjectCard
                    key={projectItem.projectId}
                    projectItem={projectItem}
                    onOpenProject={setSelectedProject}
                  />
                ))}
              </div>

              {filteredProjectItems.length === 0 && (
                <div className="card">
                  <strong>No matches</strong>
                  <p>Try removing filters or searching something broader.</p>
                </div>
              )}
            </div>
          </PanelSection>

          <ProjectModal
            selectedProject={selectedProject}
            onCloseModal={() => setSelectedProject(null)}
          />
        </div>
      </div>
    </>
  );
}
