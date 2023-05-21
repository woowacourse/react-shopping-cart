import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { checkedCartItemIdsState } from '../../recoil/atoms';
import { totalProductsPriceState } from '../../recoil/selectors';
import { DELIVERY_FEE } from '../../constants';
import { useCart } from '../../hooks/useCart';
import CartItem from './CartItem';
import TotalPayment from './TotalPayment';
import Button from '../common/Button';
import Checkbox from '../common/Checkbox';

export default function CartList() {
  const { cartList, deleteFromCart } = useCart();
  const cartItemIds = cartList.map((cartItem) => cartItem.id);
  const [checkedItemIds, setCheckedItemIds] = useRecoilState(checkedCartItemIdsState(cartItemIds));
  const [isAllChecked, setIsAllChecked] = useState(true);
  const totalProductsPrice = useRecoilValue(totalProductsPriceState);

  const handleCheckedItem = (id: number) => {
    if (checkedItemIds.includes(id)) {
      setCheckedItemIds((prev) => prev.filter((itemId) => itemId !== id));
      return;
    }
    setCheckedItemIds((prev) => [...prev, id]);
  };

  const handleAllChecked = () => {
    if (isAllChecked) {
      setCheckedItemIds([]);
      setIsAllChecked(false);
      return;
    }

    setCheckedItemIds(cartList.map((cartItem) => cartItem.id));
    setIsAllChecked(true);
  };

  const deleteCheckedItems = () => {
    checkedItemIds.forEach((itemId) => deleteFromCart(itemId));
    setCheckedItemIds([]);
  };

  useEffect(() => {
    if (cartList.length === checkedItemIds.length) {
      setIsAllChecked(true);
      return;
    }

    if (isAllChecked === true) setIsAllChecked(false);
  }, [cartList, checkedItemIds, isAllChecked]);

  return (
    <Style.Container>
      <h2>든든배송 상품({cartList.length}개)</h2>
      <Style.CartItemsAndPaymentContainer>
        <Style.CartItemsContainer>
          {!cartList.length ? (
            <Style.Span>장바구니에 담긴 상품이 없습니다.</Style.Span>
          ) : (
            <Style.CartItems>
              {cartList.map((cartItemInfo) => (
                <Style.ProductContainer key={cartItemInfo.id}>
                  <Style.CheckBoxWrapper>
                    <Checkbox
                      id={`${cartItemInfo.product.name}-checkbox`}
                      checked={checkedItemIds.includes(cartItemInfo.id)}
                      itemId={cartItemInfo.id}
                      handleCheckedItem={handleCheckedItem}
                    />
                  </Style.CheckBoxWrapper>
                  <CartItem cartItemInfo={cartItemInfo} deleteCheckedItem={setCheckedItemIds} />
                </Style.ProductContainer>
              ))}
            </Style.CartItems>
          )}
          <Style.TotalCheckboxAndDeleteButtonContainer>
            <Style.TotalCheckbox
              id="total-checkbox"
              type="checkbox"
              checked={isAllChecked}
              onChange={handleAllChecked}
            />
            <Style.TotalSelectCaption htmlFor="total-checkbox">
              전체선택 ({`${checkedItemIds.length}/${cartList.length}`})
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
    </Style.Container>
  );
}

const Style = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,

  CartItemsAndPaymentContainer: styled.div`
    display: flex;

    margin-top: 20px;

    /* 태블릿, 모바일 */
    @media screen and (max-width: 991px) {
      flex-direction: column;
      align-items: center;
    }
  `,

  CartItemsContainer: styled.div`
    width: 550px;

    border-top: 4px solid var(--grey-200);
    margin-right: 80px;

    /* 태블릿 */
    @media screen and (max-width: 991px) {
      width: 708px;
      margin-right: 0;
    }

    /* 모바일 */
    @media screen and (max-width: 767px) {
      width: 315px;
    }
  `,

  CartItems: styled.ul`
    width: 550px;
    max-height: 540px;
    overflow-y: scroll;

    /* 태블릿, 모바일 */
    @media screen and (max-width: 991px) {
      width: 708px;
      margin-right: 0;
    }

    /* 모바일 */
    @media screen and (max-width: 767px) {
      width: 315px;
      margin-right: 0;
    }
  `,

  ProductContainer: styled.li`
    display: flex;

    height: 180px;

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
