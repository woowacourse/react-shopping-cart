import { useState, useEffect } from "react";

export const useFetch = (getFunc, initialData = {}) => {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
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
    getItems();
  }, []);

  return { data, isLoading, errorMessage };
};
