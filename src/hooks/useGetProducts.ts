import { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export default function useGetProducts(url: string) {
  const [value, setValue] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const json = await fetch(url);
        const data = await json.json();
        setValue(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(true);
      }
    })();
  }, []);

  return { value, loading, error };
}
