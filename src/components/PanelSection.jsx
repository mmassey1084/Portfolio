export default function PanelSection({ title, children }) {
  return (
    <section className="panel">
      <div className="panel__inner">
        <h2 className="section-title">{title}</h2>
        {children}
      </div>
    </section>
  );
}
