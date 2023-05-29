import * as Styled from './ShoppingCartStatus.styles.tsx';
import { useRecoilValue } from 'recoil';
import { cartCountSelector } from '../../../stores/cartItemsStore.ts';

const ShoppingCartStatus = () => {
  const cartItemsCount = useRecoilValue(cartCountSelector);

  return (
    <>
      {cartItemsCount !== 0 && (
        <Styled.ShoppingCartQuantity>
          <span data-cy='totalQuantity'>{cartItemsCount}</span>{' '}
        </Styled.ShoppingCartQuantity>
      )}
    </>
  );
};

export default ShoppingCartStatus;
