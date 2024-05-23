import { atom, selector } from 'recoil';
import { cartItemListState } from '../cartItemList/cartItemListSelector';
import { cartItemSelectedIdListAtom } from '../cartItem/cartItemAtom';
import { totalDiscountSelector } from '../discount/discountSelector';

const DELIVERY_FEE_THRESHOLD = 100_000;
const DELIVERY_FEE = 3_000;
const EXTRA_DELIVERY_FEE = 3_000;

export const orderedPriceSelector = selector({
  key: 'orderedPrice',
  get: ({ get }) => {
    const cartItemList = get(cartItemListState);
    const cartItemSelectedIdList = get(cartItemSelectedIdListAtom);
    const filteredCartItemList = cartItemList.filter(({ id }) =>
      cartItemSelectedIdList.includes(id),
    );
    const orderedPrice = filteredCartItemList.reduce((sum, { price, id }) => {
      const quantity =
        cartItemList.find((cartItem) => cartItem.id === id)?.quantity ?? 0;

      return sum + price * quantity;
    }, 0);

    return orderedPrice;
  },
});

export const hasExtraDeliveryFeeAtom = atom<boolean>({
  key: 'hasExtraDeliveryFee',
  default: false,
});

export const deliveryFeeSelector = selector({
  key: 'deliveryFee',
  get: ({ get }) => {
    const orderedPrice = get(orderedPriceSelector);

    const deliveryFee =
      orderedPrice <= 0 || orderedPrice >= DELIVERY_FEE_THRESHOLD
        ? 0
        : DELIVERY_FEE;

    const totalDeliveryFee = get(hasExtraDeliveryFeeAtom)
      ? deliveryFee + EXTRA_DELIVERY_FEE
      : deliveryFee;

    return totalDeliveryFee;
  },
});

export const totalPriceSelector = selector({
  key: 'totalPrice',
  get: ({ get }) => {
    const orderedPrice = get(orderedPriceSelector);
    const deliveryFee = get(deliveryFeeSelector);
    const totalDiscount = get(totalDiscountSelector);
    console.log(`totalDiscount: ${totalDiscount}`);

    const totalPrice = orderedPrice + deliveryFee - totalDiscount;

    return totalPrice;
  },
});
