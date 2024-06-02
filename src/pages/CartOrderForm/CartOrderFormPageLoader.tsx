import { ReactNode, useEffect, useState } from 'react';
import { useCartItemList } from '../../hooks/useCartItemList';
import { useRecoilValue } from 'recoil';
import { selectedCartItemIdListState } from '../../recoil/selectedCartItemList/selectedCartItemIdListState';
import LoadingFallback from '../../components/LoadingFallback/LoadingFallback';

const CartOrderFormPageLoader = ({ children }: { children: ReactNode }) => {
  const { updateCartItemList } = useCartItemList();
  const selectedCartItemIdList = useRecoilValue(selectedCartItemIdListState);
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
  else if (selectedCartItemIdList.length === 0) throw new Error('잘못된 접근입니다.');
  else return children;
};

export default CartOrderFormPageLoader;
