import { CartItem } from 'src/types';
import Item from '../CartItem';
import * as S from './CartList.styles';
import useCartListUpdate from 'src/hooks/useCartListUpdate';

interface CartListProps {
  cartList: CartItem[];
}

const CartList = ({ cartList }: CartListProps) => {
  const {
    onChange,
    onClickDeleteHandler,
    wholeSelected,
    wholeCartItemsCount,
    selectedLength,
  } = useCartListUpdate();

  const cartListElement = wholeCartItemsCount ? (
    <ul>
      {cartList.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </ul>
  ) : (
    <S.EmptyCartList>장바구니가 비었습니다.</S.EmptyCartList>
  );

  return (
    <S.CartListWrapper>
      <S.CartListHeader>
        <S.SelectLabel htmlFor="whole-select">
          <S.SelectInput
            id="whole-select"
            type="checkbox"
            checked={wholeSelected}
            onChange={onChange}
          />
          <S.SelectText>{`전체 선택 (${selectedLength}/${wholeCartItemsCount}개)`}</S.SelectText>
        </S.SelectLabel>
        <span>|</span>
        <S.SelectedDeleteButton onClick={onClickDeleteHandler}>
          선택 삭제
        </S.SelectedDeleteButton>
      </S.CartListHeader>
      {cartListElement}
    </S.CartListWrapper>
  );
};

export default CartList;
