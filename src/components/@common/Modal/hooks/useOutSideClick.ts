import { useCallback } from "react";

export function useOutsideClick(onOutsideClick: () => void) {
  return useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onOutsideClick();
      }
    },
    [onOutsideClick]
  );
}
