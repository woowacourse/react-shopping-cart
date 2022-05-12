import { useState, useEffect } from "react";

export const useFetch = (url, initialData = {}) => {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`fetch error`);
        }
        return response.json();
      })
      .then((data) => {
        if (!data) {
          throw new Error(`No Data`);
        }
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        return {};
      });
  }, []);

  return { data, isLoading, errorMessage };
};
