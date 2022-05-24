import { useState } from "react";
import { fetchData } from "../apiRequest";

export const useFetch = (
  method,
  requestUrl = "",
  initialData = {},
  requestData = {}
) => {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetch = async () => {
    setIsLoading(true);
    try {
      const fetchedData = await fetchData(method, requestUrl, requestData);
      setData(fetchedData);
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { fetch, data, isLoading, errorMessage };
};
