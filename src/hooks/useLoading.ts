import { useState } from "react";
import type { LoadingType } from "../types/loading";

const useLoading = () => {
  const [loadingState, setLoadingState] =
    useState<LoadingType>("initialLoading");

  const changeLoadingState = (state: LoadingType) => {
    setLoadingState(state);
  };

  return { loadingState, changeLoadingState };
};

export default useLoading;
