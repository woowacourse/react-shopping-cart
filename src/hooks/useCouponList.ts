import { useEffect, useState } from 'react';
import cart from '../apis/cart';
import { ERROR_MESSAGE } from '../constants/errorMessage';
import { useToastContext } from '../context/ToastContext';
import { Coupon } from '../types/coupon';

function useCouponList() {
  const [couponList, setCouponList] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { showToast } = useToastContext();

  useEffect(() => {
    loadCouponList();
  }, []);

  const loadCouponList = async () => {
    setIsLoading(true);
    try {
      const response = await cart.getCouponList();
      setCouponList(response);
    } catch (error) {
      setError(ERROR_MESSAGE.CART_LIST);
      showToast(ERROR_MESSAGE.CART_LIST);
    } finally {
      setIsLoading(false);
    }
  };

  return { couponList, isLoading, error };
}

export default useCouponList;
