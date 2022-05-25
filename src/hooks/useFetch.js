import { useState, useEffect } from "react";

export const useFetch = (getFunc, initialData = {}, isEffect = true) => {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const getItems = async () => {
    try {
      const data = await getFunc();
      setData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    isEffect && getItems();
  }, []);

  return { data, isLoading, errorMessage, getItems };
};
