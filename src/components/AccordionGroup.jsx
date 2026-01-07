import React, { useMemo, useState } from "react";
import AccordionItem from "./AccordionItem.jsx"; // <-- adjust path

export default function AccordionGroup({ children, defaultOpenIndex = null }) {
  const [openItemIndex, setOpenItemIndex] = useState(defaultOpenIndex);

  const items = useMemo(() => {
    return React.Children.toArray(children).filter((child) => {
      return React.isValidElement(child) && child.type === AccordionItem; // ✅ stable
    });
  }, [children]);

  function handleToggleItem(clickedIndex) {
    setOpenItemIndex((prev) => (prev === clickedIndex ? null : clickedIndex));
  }

  return (
    <div className="accordion-group">
      {items.map((child, index) => (
        <AccordionItem
          key={child.key ?? index}
          index={index}
          isOpen={openItemIndex === index}
          onToggle={handleToggleItem}
          {...child.props}
        />
      ))}
    </div>
  );
}


