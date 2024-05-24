import { fetchCartItems } from '@apis/shoppingCart';
import { cartItemsAtom, selectedIdsAtom, surchargeShippingFeeAtom } from '@recoil/shoppingCart';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import { useResetCouponState } from '../coupon/index';

const useRefreshStateAfterOrder = () => {
  const { resetCouponState } = useResetCouponState();
  const resetSelectedIds = useResetRecoilState(selectedIdsAtom);
  const resetSurchargeShippingFee = useResetRecoilState(surchargeShippingFeeAtom);
  const setCartItemsAtom = useSetRecoilState(cartItemsAtom);

  const refreshCartItems = async () => {
    const items = await fetchCartItems();
    setCartItemsAtom(items);
  };

  const resetStateAboutOrder = () => {
    resetCouponState();
    resetSelectedIds();
    resetSurchargeShippingFee();
  };

  const refreshStateAfterOrder = async () => {
    await refreshCartItems();
    resetStateAboutOrder();
  };

  return { refreshStateAfterOrder };
};

export default useRefreshStateAfterOrder;
