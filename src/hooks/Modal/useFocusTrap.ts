import { useEffect, RefObject } from "react";

export function useFocusTrap<T extends HTMLElement>(
  modalRef: RefObject<T | null>,
  isOpen: boolean
) {
  useEffect(() => {
    if (!isOpen) return;

    const modalEl = modalRef.current;
    if (!modalEl) return;

    const prevActive = document.activeElement as HTMLElement | null;
    const nodes = Array.from(
      modalEl.querySelectorAll<HTMLElement>(
        'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    );

    const first = nodes[0];
    const last = nodes[nodes.length - 1];

    if (nodes.length === 0) {
      modalEl.setAttribute("tabindex", "-1");
      modalEl.focus();
      return;
    }
    first.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab" && e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (
        e.key === "Tab" &&
        !e.shiftKey &&
        document.activeElement === last
      ) {
        e.preventDefault();
        first?.focus();
      }
    };

    modalEl.addEventListener("keydown", onKeyDown);
    return () => {
      modalEl.removeEventListener("keydown", onKeyDown);
      prevActive?.focus();
    };
  }, [modalRef.current, isOpen]);
}
