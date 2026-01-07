import { Navigate, Route, Routes } from "react-router-dom";
import TopNavigation from "../components/TopNavigation.jsx";
import SiteFooter from "../components/SiteFooter.jsx";

import HomePage from "../pages/HomePage.jsx";
import ProjectsPage from "../pages/ProjectsPage.jsx";
import BlogPage from "../pages/BlogPage.jsx";
import ContactPage from "../pages/ContactPage.jsx";

export default function App() {
  return (
    <div className="app-shell">
      <TopNavigation />

      <main className="container" role="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <SiteFooter />
    </div>
  );
}
