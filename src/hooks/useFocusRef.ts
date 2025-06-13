import { useEffect, useRef } from 'react';

const useFocusRef = (isOpen: boolean) => {
  const focusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !focusRef.current) return;

    const focusElements = focusRef.current;

    const focusableElements = focusElements?.querySelectorAll<HTMLElement>(
      'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements?.[0];
    const lastElement = focusableElements?.[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || focusableElements?.length === 0) return;
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    firstElement?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);
  return { focusRef };
};
export default useFocusRef;
