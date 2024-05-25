import useSelectAllCartItem from '../../hooks/useSelectAllCartItem';

import type { CartItemType } from '../../types';
import CartItem from '../CartItem';
import CheckBox from '../common/CheckBox';

import * as S from './styles';

export default function CartList({ items }: { items: CartItemType[] }) {
  const { isAllSelected, toggleAllSelected } = useSelectAllCartItem();

  return (
    <S.Wrapper>
      <CheckBox
        isSelected={isAllSelected}
        toggleSelected={toggleAllSelected}
        label="전체 선택"
      />
      {items && (
        <S.CartListContainer>
          {items.map((item, index) => (
            <CartItem key={index} cartItem={item} />
          ))}
        </S.CartListContainer>
      )}
    </S.Wrapper>
  );
}
