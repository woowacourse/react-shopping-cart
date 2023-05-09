import { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export default function useGetProducts(url: string) {
  const [value, setValue] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const json = await fetch(url);
        const data = await json.json();
        console.log(data);
        setValue(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    })();
  }, []);

  return { value, loading, error };
}
