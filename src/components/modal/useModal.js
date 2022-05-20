import { useContext } from "react";
import ModalContext from "@shared/modal/ModalContext";

function useModal() {
  return useContext(ModalContext);
}

export default useModal;
