import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useCart } from '../../hooks/useCart';
import CartItem from './CartItem';
import Checkbox from '../common/Checkbox';
import Button from '../common/Button';
import { useRecoilState, useRecoilValue } from 'recoil';
import { checkedCartItemsState } from '../../recoil/atoms';
import TotalPayment from './TotalPayment';
import { DELIVERY_FEE } from '../../constants';
import { totalProductsPriceState } from '../../recoil/selectors';

export default function CartList() {
  const { cartList, deleteFromCart } = useCart();
  const [isAllChecked, setIsAllChecked] = useState(true);
  const [checkedItems, setCheckedItems] = useRecoilState(checkedCartItemsState);
  const totalProductsPrice = useRecoilValue(totalProductsPriceState);

  const handleCheckedItem = (id: number) => {
    if (checkedItems.includes(id)) {
      setCheckedItems((prev) => prev.filter((itemId) => itemId !== id));
      return;
    }
    setCheckedItems((prev) => [...prev, id]);
  };

  const handleAllChecked = () => {
    if (isAllChecked) {
      setCheckedItems([]);
      setIsAllChecked(false);
      return;
    }

    setCheckedItems(cartList.map((cartItem) => cartItem.id));
    setIsAllChecked(true);
  };

  const deleteCheckedItems = () => {
    checkedItems.forEach((itemId) => deleteFromCart(itemId));
    setCheckedItems([]);
  };

  useEffect(() => {
    setCheckedItems(cartList.map((cartItem) => cartItem.id));
  }, []);

  useEffect(() => {
    console.log(checkedItems);
    if (cartList.length === checkedItems.length) {
      setIsAllChecked(true);
      return;
    }

    if (isAllChecked === true) setIsAllChecked(false);
  }, [cartList, checkedItems, isAllChecked]);

  return (
    <Style.CartListContainer>
      <h2>든든배송 상품({cartList.length}개)</h2>
      <Style.CartItemsAndPaymentContainer>
        <Style.CartItemsContainer>
          <Style.CartItems>
            {cartList.map((cartItemInfo) => (
              <Style.ProductContainer>
                <Style.CheckBoxWrapper>
                  <Checkbox
                    id={`${cartItemInfo.product.name}-checkbox`}
                    checked={checkedItems.includes(cartItemInfo.id)}
                    itemId={cartItemInfo.id}
                    handleCheckedItem={handleCheckedItem}
                  />
                </Style.CheckBoxWrapper>
                <CartItem cartItemInfo={cartItemInfo} deleteCheckedItem={setCheckedItems} />
              </Style.ProductContainer>
            ))}
          </Style.CartItems>
          <Style.TotalCheckboxAndDeleteButtonContainer>
            <Style.TotalCheckbox
              id="total-checkbox"
              type="checkbox"
              checked={isAllChecked}
              onChange={handleAllChecked}
            />
            <Style.TotalSelectCaption htmlFor="total-checkbox">
              전체선택 ({`${checkedItems.length}/${cartList.length}`})
            </Style.TotalSelectCaption>
            <Style.Span aria-hidden>|</Style.Span>
            <Button
              designType="text"
              fontSize={'12px'}
              color={'black'}
              onClick={deleteCheckedItems}
            >
              선택삭제
            </Button>
          </Style.TotalCheckboxAndDeleteButtonContainer>
        </Style.CartItemsContainer>
        <TotalPayment totalProductsPrice={totalProductsPrice} deliveryFee={DELIVERY_FEE} />
      </Style.CartItemsAndPaymentContainer>
    </Style.CartListContainer>
  );
}

const Style = {
  CartListContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,

  CartItemsAndPaymentContainer: styled.div`
    display: flex;

    margin-top: 20px;
  `,

  CartItemsContainer: styled.div`
    border-top: 4px solid var(--grey-200);
    margin-right: 80px;
  `,

  CartItems: styled.ul`
    height: 600px;
    overflow-y: scroll;
  `,

  ProductContainer: styled.li`
    display: flex;

    width: 550px;
    height: 200px;

    padding: 20px;
    border-bottom: 1px ridge;
  `,

  CheckBoxWrapper: styled.div`
    margin-right: 20px;
    border-radius: 2px;
  `,

  TotalCheckboxAndDeleteButtonContainer: styled.div`
    display: flex;
    align-items: center;

    padding: 20px;
    margin-right: 20px;
  `,

  TotalCheckbox: styled.input`
    width: 20px;
    height: 20px;

    margin-right: 20px;

    cursor: pointer;
  `,

  TotalSelectCaption: styled.label`
    width: 90px;

    font-size: 12px;

    cursor: pointer;
  `,

  Span: styled.span`
    margin: 0 5px;

    color: var(--grey-200);
  `,
};
