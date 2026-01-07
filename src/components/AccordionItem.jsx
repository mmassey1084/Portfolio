import { useId } from "react";

/**
 * AccordionItem
 * Individual accordion panel controlled by AccordionGroup
 */
export default function AccordionItem({
  title,
  date,
  children,
  index,
  isOpen,
  onToggle,
}) {
  const panelId = useId();

  function handleClick() {
    onToggle(index);
  }

  return (
    <div className="accordion-item">
      <button
  type="button"
  className={`accordion ${isOpen ? "active" : ""}`}
  onClick={handleClick}
  aria-expanded={isOpen}
  aria-controls={panelId}
>
  <span className="accordion-title">{title}</span>

  <span className="accordion-meta">
    <span className="accordion-date">{date}</span>
    <span className="accordion-icon">{isOpen ? "−" : "+"}</span>
  </span>
</button>


      {isOpen && (
        <div
          id={panelId}
          className="accordion-panel"
          role="region"
        >
          {children}
        </div>
      )}
    </div>
  );
}

