import { getCoupons } from '../api/getCoupons';
import { useApiContext } from './useApiContext';

export const useCoupons = () => {
  return useApiContext({ fetchFn: getCoupons, key: 'coupons' });
};
