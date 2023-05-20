import { Dispatch, SetStateAction, useEffect } from 'react';
import { toast } from 'react-toastify';
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
        toast.error(errorMessage);
      }
    };

    fetchData();
  }, [setProducts]);
};

export default useFetchProducts;
