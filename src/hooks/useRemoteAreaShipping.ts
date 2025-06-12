import { useState } from "react";

export const useRemoteAreaShipping = () => {
  const [isRemoteAreaShipping, setIsRemoteAreaShipping] =
    useState<boolean>(false);

  return {
    isRemoteAreaShipping,
    setIsRemoteAreaShipping,
  };
};
