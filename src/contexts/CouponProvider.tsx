import { ReactNode } from 'react';
import useCoupons from '../hooks/useCoupons';
import useCheckedCouponIds from '../hooks/useCheckedCouponIds';
import { CouponContext } from './CouponContext';

const CouponProvider = ({ children }: { children: ReactNode }) => {
  const couponsState = useCoupons();
  const checkedCouponIdsState = useCheckedCouponIds();

  return (
    <CouponContext.Provider
      value={{
        ...couponsState,
        ...checkedCouponIdsState,
      }}>
      {children}
    </CouponContext.Provider>
  );
};

export default CouponProvider;
