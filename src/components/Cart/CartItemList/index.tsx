import { useEffect } from 'react';
import * as S from './CartItemList.styles';
import { useRecoilState } from 'recoil';
import { cartListAtom, checkedItemsAtom } from 'recoil/cartList';
import CartItem from 'components/Cart/CartItem';
import { useGet } from 'hooks/useGet';
import { Cart } from 'types';
import { deleteCartItem, getCartList } from 'api/requests';

const CartItemList = () => {
  const [checkedItems, setCheckedItems] = useRecoilState(checkedItemsAtom);
  const { data } = useGet<{ cartList: Cart[] }>(getCartList);
  const [cartList, setCartList] = useRecoilState(cartListAtom);

  useEffect(() => {
    setCheckedItems(cartList);
  }, [cartList]);

  const fetchedCartList = cartList.map(
    (cartItem) => cartItem && <CartItem cartItem={cartItem} key={cartItem.id} />
  );

  const emptyList = <S.EmptyList>장바구니가 비어있습니다.</S.EmptyList>;

  const onChangeAllCheckBoxes = () => {
    if (checkedItems.length === cartList.length) {
      setCheckedItems([]);
      return;
    }
    setCheckedItems(cartList);
  };

  const onDeleteSelectedItems = () => {
    checkedItems.forEach(({ id }) => deleteCartItem(id));
    setCartList((prev) => prev.filter((item) => !checkedItems.includes(item)));
  };

  return (
    <S.ItemWrapper>
      <S.CartItemTitle>든든배송 상품({checkedItems.length}개)</S.CartItemTitle>
      {data?.cartList?.length === 0 && emptyList}
      {fetchedCartList}
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
