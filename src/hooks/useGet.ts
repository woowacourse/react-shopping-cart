import { useEffect, useState } from 'react';
import { useToast } from 'components/@common/Toast/hooks/useToast';

export const useGet = <T>(callback: any) => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchData(callback);
  }, []);

  const fetchData = async (callback: CallableFunction) => {
    try {
      const data = await callback();
      setData(data);
    } catch (error) {
      if (!(error instanceof Error)) return;
      setIsLoading(false);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading };
};
