import * as S from './CartItemList.styles';
import { useRecoilState } from 'recoil';
import { cartListAtom } from 'recoil/cartList';
import CartItem from 'components/Cart/CartItem';
import Spinner from 'components/@common/Spinner';
import { useGet } from 'hooks/useGet';
import { useCheckedItems } from '../hooks/useCheckedItems';
import { Cart } from 'types';
import { deleteCartItem, getCartList } from 'api/requests';

const CartItemList = () => {
  const { data, isLoading } = useGet<{ cartList: Cart[] }>(getCartList);
  const [cartList, setCartList] = useRecoilState(cartListAtom);
  const { checkedItems, checkAllItems, checkItem, removeAllCheckedItems } =
    useCheckedItems(cartList);

  const loading = (
    <S.Loading>
      <Spinner />
      <S.LoadingText>장바구니를 불러오는 중입니다...</S.LoadingText>
    </S.Loading>
  );

  const fetchedCartList = cartList.map(
    (cartItem) =>
      cartItem && (
        <CartItem
          cartItem={cartItem}
          key={cartItem.id}
          checkedItems={checkedItems}
          checkItem={checkItem}
        />
      )
  );

  const emptyList = <S.EmptyList>장바구니가 비어있습니다.</S.EmptyList>;

  const onChangeAllCheckBoxes = () => {
    if (checkedItems.length === cartList.length) {
      removeAllCheckedItems();
      return;
    }
    checkAllItems();
  };

  const onDeleteSelectedItems = () => {
    checkedItems.forEach(({ id }) => deleteCartItem(id));
    setCartList((prev) => prev.filter((item) => !checkedItems.includes(item)));
  };

  return (
    <S.ItemWrapper>
      <S.CartItemTitle>든든배송 상품({checkedItems.length}개)</S.CartItemTitle>
      {data?.cartList?.length === 0 && emptyList}
      {isLoading ? loading : fetchedCartList}
      <S.CheckBoxWrapper>
        <S.SelectAllCheckBox
          type="checkbox"
          onChange={onChangeAllCheckBoxes}
          checked={checkedItems.length === cartList.length}
        />
        <S.Text>
          전체 선택 ({checkedItems.length}/{cartList.length})개
        </S.Text>
        <S.SelectDeleteButton onClick={onDeleteSelectedItems}>
          선택 삭제
        </S.SelectDeleteButton>
      </S.CheckBoxWrapper>
    </S.ItemWrapper>
  );
};

export default CartItemList;
