import { useEffect, useState } from 'react';

const useProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/products', { method: 'GET' });

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return products;
};

export default useProductList;
