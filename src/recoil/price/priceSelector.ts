import { selector } from 'recoil';
import { cartItemListState } from '../cartItemList/cartItemListSelector';
import { cartItemQuantityAtomFamily, cartItemSelectedIdListAtom } from '../cartItem/cartItemAtom';

const DELIVERY_FEE_THRESHOLD = 100_000;
const DELIVERY_FEE = 3_000;

export const priceSelector = selector({
  key: 'price',
  get: ({ get }) => {
    const cartItemList = get(cartItemListState);
    const cartItemSelectedIdList = get(cartItemSelectedIdListAtom);
    const filteredCartItemList = cartItemList.filter(({ id }) => cartItemSelectedIdList.includes(id));

    const orderedPrice = filteredCartItemList.reduce((sum, { product, id }) => {
      const { price } = product;
      const quantity = get(cartItemQuantityAtomFamily(id));

      return (sum += price * quantity);
    }, 0);

    const deliveryFee = orderedPrice <= 0 || orderedPrice >= DELIVERY_FEE_THRESHOLD ? 0 : DELIVERY_FEE;
    const totalPrice = orderedPrice + deliveryFee;

    return { orderedPrice, deliveryFee, totalPrice };
  },
});
