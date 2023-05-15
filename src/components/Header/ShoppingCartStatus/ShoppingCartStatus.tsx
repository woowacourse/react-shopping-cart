import * as Styled from './ShoppingCartStatus.styles.tsx';
import { useRecoilValue } from 'recoil';
import { cartItemsQuantitySelector } from '../../../stores/cartItemsStore.ts';

const ShoppingCartStatus = () => {
  const cartItemsCount = useRecoilValue(cartItemsQuantitySelector);

  return (
    <Styled.ShoppingCartQuantity>
      <span data-cy='totalQuantity'>{cartItemsCount}</span>
    </Styled.ShoppingCartQuantity>
  );
};

export default ShoppingCartStatus;
