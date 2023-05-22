import { CartItem } from 'src/types';
import { useGetFetch } from './useFetch';
import useToast from './useToast';
import { cartListAtom } from 'src/recoil/cartList';
import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react';

const useGetCartList = () => {
  const { toast } = useToast();
  const { data, error, loading } = useGetFetch<CartItem[]>(
    '/api/cart-items',
    []
  );
  const setCartItem = useSetRecoilState(cartListAtom); // 로그인 했을 경우에는 데이터를 받아오고, 그게 아닌 경우에는 로컬스토리지로 저장할 것.

  useEffect(() => {
    if (loading) return;

    if (error.isError) {
      toast.error(error.message);
      return;
    }

    setCartItem(data);
  }, [loading]);

  return data;
};

export default useGetCartList;
