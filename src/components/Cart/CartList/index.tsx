import Item from '../CartItem';
import * as S from './CartList.styles';
import useCartListUpdate from 'src/hooks/useCartListUpdate';
import CheckBox from 'src/components/@common/CheckBox';
import theme from 'src/styles/theme';
import { PATH } from 'src/utils/constants';
import useCartUpdate from 'src/hooks/useCartUpdate';

const CartList = () => {
  const {
    cartList,
    wholeChange,
    checkItem,
    currentIdIsChecked,
    wholeSelected,
    selectedIds,
  } = useCartListUpdate();
  const { checkedItemDelete } = useCartUpdate();

  const checkedDeleteClick = () => checkedItemDelete(selectedIds);

  const cartListElement = cartList.length ? (
    <ul>
      {cartList.map((item) => (
        <Item
          key={item.id}
          item={item}
          checkItem={checkItem}
          isChecked={currentIdIsChecked}
        />
      ))}
    </ul>
  ) : (
    <S.EmptyCartList>
      <p>장바구니가 비었습니다.</p>
      <S.GoToProductListTag to={PATH.HOME}>담으러 가기</S.GoToProductListTag>
    </S.EmptyCartList>
  );

  return (
    <S.CartListWrapper>
      <S.CartListHeader>
        <CheckBox
          id="whole-select"
          backgroundColor={theme.color.secondary}
          checked={wholeSelected}
          onChange={wholeChange}
        >
          <S.SelectText>{`전체 선택 (${selectedIds.length}/${cartList.length}개)`}</S.SelectText>
        </CheckBox>
        <S.SelectedDeleteButton onClick={checkedDeleteClick}>
          선택 삭제
        </S.SelectedDeleteButton>
      </S.CartListHeader>
      {cartListElement}
    </S.CartListWrapper>
  );
};

export default CartList;
