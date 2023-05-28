import * as styled from './CartSize.styled';

import { useCartSizeValue } from '../../../recoils/recoilCart';

export const CartSize = () => {
  const cartSize = useCartSizeValue();

  return <styled.CartSize>{cartSize}</styled.CartSize>;
};
