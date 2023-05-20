import { useState } from 'react';
import { useSetRecoilState } from 'recoil';

import * as api from '../api';
import { cartState } from '../recoil/state';

const useQuantityInput = (cartItemId: number) => {
  const [quantityInput, setQuantityInput] = useState('');
  const setCart = useSetRecoilState(cartState);

  const setQuantityInputProxy = (quantity: number) => {
    if (quantity === 0) {
      api.deleteCartItem(cartItemId).then(api.getCart).then(setCart);
    } else {
      api.patchCartItemQuantity(cartItemId, quantity).then(api.getCart).then(setCart);
    }

    setQuantityInput(quantity.toString());
  };

  return [quantityInput, { setQuantityInput, setQuantityInputProxy }] as const;
};

export default useQuantityInput;
