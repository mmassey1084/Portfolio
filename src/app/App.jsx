import { Navigate, Route, Routes } from "react-router-dom";
import SiteFooter from "../components/SiteFooter.jsx";

import HomePage from "../pages/HomePage.jsx";
import ProjectsPage from "../pages/ProjectsPage.jsx";
import BlogPage from "../pages/BlogPage.jsx";
import ContactPage from "../pages/ContactPage.jsx";

export default function App() {
  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      <SiteFooter />
    </div>
  );
}

