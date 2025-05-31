import {
  ToastService,
  type ToastInfo,
} from "@shared/components/Toast/ToastService";
import { useCallback, useRef } from "react";

const useToast = () => {
  const toastService = ToastService.getInstance();
  const toastId = useRef(0);

  const addToast = useCallback(
    ({ type, message }: Omit<ToastInfo, "id">) => {
      const id = String(toastId.current++);
      toastService.addToast(id, type, message);
    },
    [toastService]
  );

  return {
    addToast,
  };
};

export default useToast;
