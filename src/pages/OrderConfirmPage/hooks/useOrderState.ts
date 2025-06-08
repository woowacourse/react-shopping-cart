import { useState } from "react";

export const useOrderState = () => {
  const [isIsolatedAreaSelected, setIsIsolatedAreaSelected] = useState(false);

  const toggleIsolatedArea = () => {
    setIsIsolatedAreaSelected((prev) => !prev);
  };

  return {
    isIsolatedAreaSelected,
    toggleIsolatedArea,
  };
};
