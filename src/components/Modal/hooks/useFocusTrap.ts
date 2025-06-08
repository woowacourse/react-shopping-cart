import { useEffect, useRef, KeyboardEvent } from 'react';

type UseFocusTrapProps<T extends HTMLElement = HTMLElement> = {
  initialFocusRef?: React.RefObject<T>;
  onEscape?: () => void;
};

export function useFocusTrap<T extends HTMLElement = HTMLElement>({
  initialFocusRef,
  onEscape,
}: UseFocusTrapProps<T> = {}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const getFocusableElements = () => {
    if (!containerRef.current) {
      return [];
    }

    const focusableElements = containerRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    return Array.from(focusableElements);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && onEscape) {
      onEscape();
      return;
    }

    if (e.key === 'Tab') {
      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  };

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    if (initialFocusRef && initialFocusRef.current) {
      initialFocusRef.current.focus();
    } else {
      const focusableElements = getFocusableElements();
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [initialFocusRef]);

  return {
    containerRef,
    handleKeyDown,
  };
}
