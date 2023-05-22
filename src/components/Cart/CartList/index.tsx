import Item from '../CartItem';
import * as S from './CartList.styles';
import useCartListUpdate from 'src/hooks/useCartListUpdate';
import CheckBox from 'src/components/@common/CheckBox';
import theme from 'src/styles/theme';
import { PATH } from 'src/utils/constants';

const CartList = () => {
  const {
    cartList,
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
          onChange={onChange}
        >
          <S.SelectText>{`전체 선택 (${selectedLength}/${wholeCartItemsCount}개)`}</S.SelectText>
        </CheckBox>
        <S.SelectedDeleteButton onClick={onClickDeleteHandler}>
          선택 삭제
        </S.SelectedDeleteButton>
      </S.CartListHeader>
      {cartListElement}
    </S.CartListWrapper>
  );
};

export default CartList;
