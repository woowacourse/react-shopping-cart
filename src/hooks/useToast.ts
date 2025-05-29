import { useContext } from "react";
import { ToastContext } from "../contexts/ToastContext";

const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};

export default useToast;
