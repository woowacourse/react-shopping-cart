import * as styled from './CartSize.styled';

import { useCartSize } from '../../../recoils/recoilCart';

export const CartSize = () => {
  const cartSize = useCartSize();

  return <styled.CartSize>{cartSize}</styled.CartSize>;
};
