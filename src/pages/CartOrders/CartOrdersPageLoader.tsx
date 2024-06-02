import { PropsWithChildren, useEffect, useState } from 'react';
import LoadingFallback from '../../components/LoadingFallback/LoadingFallback';
import { useCartItemList } from '../../hooks/useCartItemList';

type CartOrderPageLoaderProps = PropsWithChildren & {
  retryKey?: number;
};

const CartOrdersPageLoader = ({ children }: PropsWithChildren<CartOrderPageLoaderProps>) => {
  const { updateCartItemList } = useCartItemList();
  const [error, setError] = useState<null | Error>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        setLoading(true);
        await updateCartItemList();
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingFallback />;
  else if (error !== null) throw error;
  else return children;
};

export default CartOrdersPageLoader;
