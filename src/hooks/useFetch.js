import { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export const useFetch = (url, { type, key }) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

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

        dispatch({
          type,
          payload: {
            [key]: data,
          },
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        return {};
      });
  }, [dispatch]);

  return isLoading;
};
