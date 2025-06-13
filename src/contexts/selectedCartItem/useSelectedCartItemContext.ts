import { useContext } from "react";
import { SelectedCartItemContext } from "./SelectedCartItemProvider";

export const useSelectedCartItemContext = () => {
  const context = useContext(SelectedCartItemContext);
  if (!context) {
    throw new Error(
      "useSelectedCartItemContext must be used within a useSelectedCartItemProvider"
    );
  }
  return context;
};
