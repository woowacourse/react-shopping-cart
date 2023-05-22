import { Product } from 'src/types';
import { useGetFetch } from './useFetch';
import useToast from './useToast';
import { useEffect } from 'react';

const useGetPRoductList = () => {
  const { data, error } = useGetFetch<Product[]>('/api/products', []);
  const { toast } = useToast();
  useEffect(() => {
    if (error.isError) {
      toast.error(error.message);
    }
  }, [error]);

  return data;
};

export default useGetPRoductList;
