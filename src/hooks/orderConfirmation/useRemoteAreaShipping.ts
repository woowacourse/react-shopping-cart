import { useState } from "react";

const useRemoteAreaShipping = () => {
  const [isRemoteAreaShipping, setIsRemoteAreaShipping] = useState(false);

  const handleToggle = () => {
    setIsRemoteAreaShipping((prev) => !prev);
  };

  return { isRemoteAreaShipping, handleToggle };
};

export default useRemoteAreaShipping;
