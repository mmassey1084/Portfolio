import React, { useMemo, useState } from "react";

/**
 * AccordionGroup
 * Controls which accordion item is open.
 * Only ONE item can be open at a time.
 */
export default function AccordionGroup({ children, defaultOpenIndex = null }) {
  const [openItemIndex, setOpenItemIndex] = useState(defaultOpenIndex);

  function handleToggleItem(clickedIndex) {
    setOpenItemIndex((previousIndex) =>
      previousIndex === clickedIndex ? null : clickedIndex
    );
  }

  const items = useMemo(() => {
    return React.Children.toArray(children).filter((child) => {
      if (!React.isValidElement(child)) return false;
      return child.type?.name === "AccordionItem";
    });
  }, [children]);

  return (
    <div className="accordion-group">
      {items.map((child, index) => (
        <child.type
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

