/* eslint-disable react-hooks/exhaustive-deps */
import CartProductItem from '../CartProductItem/CartProductItem';
import checkIcon from '../../../assets/check.svg';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { cartListAtom, itemSelectionAtom } from '../../../stores/cartItemsStore';
import { useEffect, useState } from 'react';
import useUpdateCartItems from '../../../hooks/useUpdateCartItems';
import useGetData from '../../../hooks/useGetData';
import { CartItem } from '../../../types';
import * as Styled from './CartProductSummary.styles';

const CartProductSummary = () => {
  const { data: cartListData, getData: getCartList } = useGetData<CartItem[]>('/cart-items');
  const { updateCartItems } = useUpdateCartItems();
  const [itemSelection, setItemSelection] = useRecoilState(itemSelectionAtom);
  const setCartList = useSetRecoilState(cartListAtom);
  const cartList = useRecoilValue(cartListAtom);
  const [initialLoad, setInitialLoad] = useState(false);

  const selectAll = () => {
    setItemSelection(itemSelection.map(() => true));
  };

  const cancelSelectAll = () => {
    setItemSelection(itemSelection.map(() => false));
  };

  const toggleItemSelection = (index: number) => () => {
    setItemSelection((prev) => prev.map((value, currentIndex) => (currentIndex === index ? !value : value)));
  };

  const deleteItemSelection = (index: number) => async () => {
    await updateCartItems({ itemId: cartList[index].id, itemCount: 0 });
    await getCartList();

    setItemSelection((prev) => prev.filter((_, idx) => index !== idx));
  };

  const deleteCartItem = () => {
    const checkItemIndex: number[] = [];

    itemSelection.forEach(async (checkedItem, index) => {
      if (checkedItem) {
        checkItemIndex.push(index);
        await updateCartItems({ itemId: cartList[index].id, itemCount: 0 });
        await getCartList();
      }
    });
    setItemSelection((prev) => prev.filter((_, index) => !checkItemIndex.includes(index)));
  };

  useEffect(() => {
    getCartList();
  }, []);

  useEffect(() => {
    if (cartListData) {
      setCartList(cartListData);
      if (!initialLoad) {
        setItemSelection(Array.from({ length: cartListData.length }, () => true));
        setInitialLoad(true);
      }
    }
  }, [cartListData, initialLoad]);

  return (
    <>
      {cartList.length !== 0 ? (
        <Styled.Wrapper>
          <Styled.ProductCountWrapper>
            <Styled.ProductCount>든든배송 상품 ({cartList.length}개)</Styled.ProductCount>
          </Styled.ProductCountWrapper>
          <Styled.ProductList role='list'>
            {cartList.map((cartItem, index) => {
              return (
                <CartProductItem
                  key={cartItem.id}
                  check={itemSelection[index] ?? true}
                  {...cartItem}
                  toggleItemSelection={toggleItemSelection(index)}
                  deleteItemSelection={deleteItemSelection(index)}
                />
              );
            })}
          </Styled.ProductList>
          <Styled.ProductSelectWrapper>
            <Styled.Label>
              <Styled.Input
                type='checkbox'
                icon={checkIcon}
                checked={itemSelection.every((item) => item === true)}
                onChange={itemSelection.every((item) => item === true) ? cancelSelectAll : selectAll}
              />
              <Styled.LabelContent>
                전체선택 ({itemSelection.filter((item) => item === true).length}/{cartList.length})
              </Styled.LabelContent>
            </Styled.Label>
            <Styled.ProductsDeleteButton onClick={deleteCartItem}>선택삭제</Styled.ProductsDeleteButton>
          </Styled.ProductSelectWrapper>
        </Styled.Wrapper>
      ) : (
        <Styled.EmptyProductWrapper>장바구니가 비어있습니다!</Styled.EmptyProductWrapper>
      )}
    </>
  );
};

export default CartProductSummary;
