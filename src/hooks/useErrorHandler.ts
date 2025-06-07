import { useCallback } from "react";
import { TOAST_TYPES } from "../features/toast/type";
import useToast from "../features/toast/useToast";

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
