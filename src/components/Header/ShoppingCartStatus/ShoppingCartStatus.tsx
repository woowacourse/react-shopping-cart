import * as Styled from './ShoppingCartStatus.styles.tsx';
import { useRecoilValue } from 'recoil';
import { carListTotalQuantitySelector } from '../../../stores/cartListStore.ts';

const ShoppingCartStatus = () => {
  const totalNumber = useRecoilValue(carListTotalQuantitySelector);

  return (
    <Styled.ShoppingCartQuantity>
      <span data-cy='totalQuantity'>{totalNumber}</span>
    </Styled.ShoppingCartQuantity>
  );
};

export default ShoppingCartStatus;
