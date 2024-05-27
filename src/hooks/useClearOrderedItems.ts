import { useSetRecoilState } from 'recoil';
import {
  appliedCouponIdsState,
  cartItemsState,
  checkedCartItemIdsState,
  discountAmountState,
  remoteShippingOptionState,
} from '../recoil/atoms';

export default function useClearOrderedItems() {
  const setCheckedCartItemIds = useSetRecoilState(checkedCartItemIdsState);
  const setCartItemsState = useSetRecoilState(cartItemsState);
  const setDiscountAmount = useSetRecoilState(discountAmountState);
  const setAppliedCouponIds = useSetRecoilState(appliedCouponIdsState);
  const setRemoteShippingOption = useSetRecoilState(remoteShippingOptionState);

  const clearOrderedItems = (checkedCartItemIds: number[]) => {
    setCartItemsState((prevCartItems) =>
      [...prevCartItems].filter((item) => !checkedCartItemIds.includes(item.id)),
    );
    setCheckedCartItemIds([]);
    setDiscountAmount(0);
    setAppliedCouponIds([]);
    setRemoteShippingOption(false);
  };

  return clearOrderedItems;
}
