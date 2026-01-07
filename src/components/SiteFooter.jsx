export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      © {currentYear} • Built with React • Clean UI • Accessible-first
    </footer>
  );
}
