import { useToast } from "../../contexts/ToastContext";
import useLoading from "./useLoading";
import type { LoadingType } from "../../types/loading";

const useApiHandler = () => {
  const { loadingState, changeLoadingState } = useLoading();
  const { openToast } = useToast();

  const callApi = async <T>(
    apiFn: () => Promise<T>,
    successMessage: string,
    loadingType: LoadingType
  ): Promise<T | undefined> => {
    try {
      changeLoadingState(loadingType);
      console.log("작동");

      const data = await apiFn();
      changeLoadingState("success");

      openToast(successMessage, true);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.log("에러 발생");
        changeLoadingState("error");
        openToast(error.message, false);
      }
      return undefined;
    }
  };

  return {
    callApi,
    loadingState,
  };
};

export default useApiHandler;
