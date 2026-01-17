import { NavLink } from "react-router-dom";

export default function TopNavigation() {
  return (
    <header className="top-nav">
      <div className="top-nav__inner">
        <div className="brand" aria-label="Site brand">
          <div className="brand__badge" aria-hidden="true">
            <span>mm</span>
          </div>
          <div>
            <div style={{ fontWeight: 900 }}>Michael's Portfolio</div>
          </div>
        </div>

        <nav className="nav-links" aria-label="Primary">
          <NavLink className="nav-link" to="/">About</NavLink>
          <NavLink className="nav-link" to="/projects">Work</NavLink>
          <NavLink className="nav-link" to="/blog">Blog</NavLink>
          <NavLink className="nav-link" to="/contact">Contact</NavLink>
        </nav>
      </div>
    </header>
  );
}
