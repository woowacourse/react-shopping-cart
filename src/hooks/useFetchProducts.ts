import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import errorMessage from '../constant/errorMessage';

const useFetchProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('./products/');
        const data = await response.json();
        setProducts(data);
      } catch (e) {
        toast.error(errorMessage.FETCH_PRODUCTS);
      }
    };

    fetchData();
  }, []);

  return products;
};

export default useFetchProducts;
