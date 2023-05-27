import { Dispatch, SetStateAction, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import errorMessage from '../constant/errorMessage';

type useFetchProductsProps = Dispatch<SetStateAction<never[]>>;

const useFetchProducts = (setProducts: useFetchProductsProps): void => {
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch('./products/');
        const data = await response.json();
        setProducts(data);
      } catch (e) {
        toast.error(errorMessage.fetchProducts);
      }
    };

    fetchData();
  }, [setProducts]);
};

export { useFetchProducts, toast };
