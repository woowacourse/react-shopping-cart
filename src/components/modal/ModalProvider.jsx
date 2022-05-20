import { useState } from "react";
import ModalContext from "@shared/modal/ModalContext";

function ModalProvider({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    isVisible,
    hide: () => setIsVisible(false),
    show: () => setIsVisible(true),
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

export default ModalProvider;
