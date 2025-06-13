import { LegacyRef, useEffect, useRef } from "react";

const useClickOutsideRef = <T extends HTMLElement>(
  callback: () => void
): LegacyRef<T> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent | TouchEvent) => {
      const container = ref.current;
      if (!container || container.contains(e.target as Node)) {
        return;
      }

      callback();
    };

    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [callback]);

  return ref;
};

export default useClickOutsideRef;
