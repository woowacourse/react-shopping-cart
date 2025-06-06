import { useCallback } from "react";
import useToast from "./contexts/useToast";
import { TOAST_TYPES } from "../components/@common/Toast/type";

const useErrorHandler = () => {
  const { showToast } = useToast();

  const handleError = useCallback(
    (error: unknown) => {
      const message =
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.";
      showToast({ message, type: TOAST_TYPES.ERROR });
    },
    [showToast]
  );

  return { handleError };
};

export default useErrorHandler;
