import { createContext, useContext } from "react";

export interface ModalContextType {
  onClose: () => void;
  position: "bottom" | "center";
}

export const ModalContext = createContext<ModalContextType | null>(null);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};
