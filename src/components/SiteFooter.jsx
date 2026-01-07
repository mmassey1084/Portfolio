import { FaGithub, FaLinkedin } from "react-icons/fa";
import { profileData } from "../data/profile.js";
export default function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const { links } = profileData;

  return (
    <footer className="footer">
      © {currentYear} • Built with React • Clean UI • Accessible-first <br />
      <a className="footer-btn" href={links.githubUrl} target="_blank" rel="noreferrer">
                <FaGithub /> GitHub
      </a>
      <a className="footer-btn" href={links.linkedInUrl} target="_blank" rel="noreferrer">
                <FaLinkedin /> LinkedIn
      </a>
    </footer>
  );
}
