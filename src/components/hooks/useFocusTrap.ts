import { useEffect } from "react";

const FOCUSABLE_SELECTORS = [
  "a[href]",
  "button:not([disabled])",
  'input:not([disabled]):not([type="hidden"])',
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
];

const getFocusableElements = (container: HTMLElement) => {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS.join(","))).filter(
    (el) => !el.hasAttribute("disabled"),
  );
};

export const useFocusTrap = (containerRef: React.RefObject<HTMLElement | null>, active: boolean) => {
  useEffect(() => {
    const container = containerRef.current;
    if (!active || !container) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusableEls = getFocusableElements(container);
      const firstEl = focusableEls[0];
      const lastEl = focusableEls[focusableEls.length - 1];
      const activeEl = document.activeElement;

      if (!firstEl || !lastEl) return;

      if (e.shiftKey) {
        if (activeEl === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
        return;
      }

      if (activeEl === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };

    container.addEventListener("keydown", handleKeyDown);

    getFocusableElements(container)[0]?.focus();

    return () => {
      container.removeEventListener("keydown", handleKeyDown);
    };
  }, [active]);
};
