import { useEffect, useState } from 'react';
import { fetchApi } from 'api';
import { useToast } from 'components/@common/Toast/hooks/useToast';

export const useFetch = <T>(url: string, initialData: T) => {
  const [data, setData] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetchApi(url);
      setData(data);
      setIsLoading(false);
    } catch (error) {
      if (!(error instanceof Error)) return;
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return { data, isLoading };
};
