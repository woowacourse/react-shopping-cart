import { useCallback, useEffect, useState } from "react";

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export type productsResponse = Product[];

interface GetProps {
  fetchUrl: string;
}

interface GetReturn {
  result: productsResponse;
  isLoading: boolean;
  refresh: () => void;
}

export const useGet = ({ fetchUrl }: GetProps): GetReturn => {
  const [result, setResult] = useState<productsResponse>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    fetch(fetchUrl)
      .then((response) => response.json())
      .then((data) => setResult(data))
      .catch((error) => alert(error))
      .finally(() => setIsLoading(false));
  }, [fetchUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refresh = () => {
    fetchData();
  };

  return { result, isLoading, refresh };
};
