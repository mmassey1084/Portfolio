import { useState } from "react";

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

  return (
    <div className="accordion-group">
      {children.map((child, index) =>
        child.type?.name === "AccordionItem"
          ? child
          : null
      ).map((child, index) =>
        child.props
          ? (
            <child.type
              key={index}
              index={index}
              isOpen={openItemIndex === index}
              onToggle={handleToggleItem}
              {...child.props}
            />
          )
          : null
      )}
    </div>
  );
}
