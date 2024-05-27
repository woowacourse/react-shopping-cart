import { PRICE } from '@constants/shippingCart';
import { useOrderCosts } from '@hooks/shoppingCart';
import { useState } from 'react';

const useCheckInaccessibleArea = () => {
  const { orderPrice } = useOrderCosts();

  const [isInaccessibleArea, setIsInaccessibleArea] = useState(false);

  const handleChangeInaccessibleAreaCheckBox = () => setIsInaccessibleArea((prev) => !prev);

  const isDisabledInaccessibleAreaCheckBox = orderPrice >= PRICE.freeShippingMinAmount;

  return {
    isInaccessibleArea,
    handleChangeInaccessibleAreaCheckBox,
    isDisabledInaccessibleAreaCheckBox,
  };
};

export default useCheckInaccessibleArea;
