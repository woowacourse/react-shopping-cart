import React, { useContext } from "react";

const useCustomContext = <T>(context: React.Context<T>) => {
  const contextValue = useContext(context);

  if (!contextValue) {
    throw new Error("ERROR: Context의 값이 잘못되었습니다.");
  }

  return contextValue;
};

export default useCustomContext;
