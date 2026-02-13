import { Route, Routes } from "react-router-dom";
import SiteFooter from "../components/SiteFooter.jsx";
import HomePage from "../pages/HomePage.jsx";
import ProjectsPage from "../pages/ProjectsPage.jsx";
import ContactPage from "../pages/ContactPage.jsx";
import Stats from "../pages/Stats.jsx";

export default function App() {
  return (
    <div className="app-shell">
      <main className="page-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </main>

      <SiteFooter />
    </div>
  );
}

