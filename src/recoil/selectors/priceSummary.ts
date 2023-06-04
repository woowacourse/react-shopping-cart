import { selector } from 'recoil';
import { cartItemsState, selectedCartIdListState } from '../atoms/cartAtom';
import { DELIVERY_PRICE } from '../../constants/constants';

export const priceSummaryState = selector({
  key: 'priceSummaryState',
  get: ({ get }) => {
    const selectedCartItemIds = get(selectedCartIdListState);
    const cartItems = get(cartItemsState);

    const totalProductPrice = selectedCartItemIds.reduce(
      (acc, selectedCartItemId) => {
        const product = cartItems.find(
          (cartProduct) => cartProduct.id === selectedCartItemId
        );

        if (product === undefined) return acc;

        return (acc +=
          Number(product?.quantity) * Number(product?.product.price));
      },
      0
    );

    const deliveryPrice = selectedCartItemIds.length > 0 ? DELIVERY_PRICE : 0;

    const totalPrice = totalProductPrice + deliveryPrice;

    return { totalProductPrice, deliveryPrice, totalPrice };
  },
});
