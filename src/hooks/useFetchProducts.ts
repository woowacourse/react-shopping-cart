import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import ERROR_MESSAGE from '../constant/errorMessage';

const useFetchProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('./products/');
        const data = await response.json();
        setProducts(data);
      } catch (e) {
        toast.error(ERROR_MESSAGE.fetchProducts);
      }
    };

    fetchData();
  }, []);

  return products;
};

export default useFetchProducts;
