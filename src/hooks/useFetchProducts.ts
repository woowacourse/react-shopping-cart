import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';
import ERROR_MESSAGE from '../constant/errorMessage';

type useFetchProductsProps = Dispatch<SetStateAction<never[]>>;

const useFetchProducts = (setProducts: useFetchProductsProps): void => {
  const fetchData = async (): Promise<void> => {
    try {
      const response = await fetch('/products', { method: 'GET' });
      const data = await response.json();
      setProducts(data);
    } catch (e) {
      toast.error(ERROR_MESSAGE.ERROR);
    }
  };

  fetchData();
};

export default useFetchProducts;
