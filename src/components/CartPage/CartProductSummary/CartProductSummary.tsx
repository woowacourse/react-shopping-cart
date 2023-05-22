/* eslint-disable react-hooks/exhaustive-deps */
import { styled } from 'styled-components';
import CartProductItem from '../CartProductItem/CartProductItem';
import checkIcon from '../../assets/check.svg';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { cartListAtom, itemSelectionAtom } from '../../../stores/cartItemsStore';
import { useEffect, useState } from 'react';
import useUpdateCartItems from '../../../hooks/useUpdateCartItems';
import useGetData from '../../../hooks/useGetData';
import { CartItem } from '../../../types';

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
        <Wrapper>
          <ProductCountWrapper>
            <ProductCount>든든배송 상품 ({cartList.length}개)</ProductCount>
          </ProductCountWrapper>
          <ProductList role='list'>
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
          </ProductList>
          <ProductSelectWrapper>
            <Label>
              <Input
                type='checkbox'
                icon={checkIcon}
                checked={itemSelection.every((item) => item === true)}
                onChange={itemSelection.every((item) => item === true) ? cancelSelectAll : selectAll}
              />
              <LabelContent>
                전체선택 ({itemSelection.filter((item) => item === true).length}/{cartList.length})
              </LabelContent>
            </Label>
            <ProductsDeleteButton onClick={deleteCartItem}>선택삭제</ProductsDeleteButton>
          </ProductSelectWrapper>
        </Wrapper>
      ) : (
        <EmptyProductWrapper>장바구니가 비어있습니다!</EmptyProductWrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;

const ProductCountWrapper = styled.div`
  padding-bottom: 16px;
  border-bottom: 4px solid #aaaaaa;
`;

const ProductCount = styled.span`
  font-size: 20px;
  line-height: 33px;
  letter-spacing: 0.5px;
  color: #333333;
`;

const ProductList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  width: fit-content;
  display: flex;
  align-items: center;
`;

const Input = styled.input<{ icon: string }>`
  appearance: none;
  -webkit-appearance: none;
  width: 28px;
  height: 28px;
  border: 1px solid #22a6a2;
  border-radius: 2px;
  transform: translateY(0%);
  cursor: pointer;

  &:checked {
    background: #333333;
    border: 1px solid #3288ff;
  }

  &:after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-image: ${({ icon }) => `url(${icon})`};
    background-size: 20px;
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const LabelContent = styled.span`
  margin-left: 15px;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.5px;
  color: #333333;
  cursor: pointer;
`;

const ProductsDeleteButton = styled.button`
  border: 1px solid #bbbbbb;
  padding: 8px 18px;
  background-color: #fff;
  cursor: pointer;
`;

const ProductSelectWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const EmptyProductWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  line-height: 20px;
  letter-spacing: 0.5px;
  color: #333333;
`;

export default CartProductSummary;
