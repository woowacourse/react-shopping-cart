import useSelectAllCartItem from '../../hooks/useSelectAllCartItem';

import type { CartItemType } from '../../types';
import CartItem from '../CartItem';
import CheckBox from '../common/CheckBox';

import * as S from './styles';

interface CartListProps {
  items: CartItemType[];
  summary?: boolean;
}

export default function CartList({ items, summary = false }: CartListProps) {
  const { isAllSelected, toggleAllSelected } = useSelectAllCartItem();

  return (
    <S.Wrapper>
      {!summary && (
        <CheckBox
          isSelected={isAllSelected}
          toggleSelected={toggleAllSelected}
          label="전체 선택"
        />
      )}

      {items && (
        <S.CartListContainer>
          {items.map((item, index) => (
            <CartItem key={index} cartItem={item} summary={summary} />
          ))}
        </S.CartListContainer>
      )}
    </S.Wrapper>
  );
}
