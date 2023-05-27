import { styled } from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { checkedCartItemIdsState } from '../../recoil/atoms';
import { totalProductsPriceState } from '../../recoil/selectors';
import { DELIVERY_FEE } from '../../constants';
import { useCart } from '../../hooks/useCart';
import CartItem from './CartItem';
import TotalPayment from './TotalPayment';
import Button from '../common/Button';

export default function CartList() {
  const { cartList, deleteFromCart } = useCart();
  const cartItemIds = cartList.map((cartItem) => cartItem.id);
  const [checkedItemIds, setCheckedItemIds] = useRecoilState(checkedCartItemIdsState(cartItemIds));
  const totalProductsPrice = useRecoilValue(totalProductsPriceState);

  const handleAllChecked = () => {
    if (cartList.length === checkedItemIds.length) {
      setCheckedItemIds([]);
      return;
    }

    setCheckedItemIds(cartList.map((cartItem) => cartItem.id));
  };

  const deleteCheckedItems = () => {
    checkedItemIds.forEach((itemId) => deleteFromCart(itemId));
    setCheckedItemIds([]);
  };

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
                <Style.CartItemWrapper key={cartItemInfo.id}>
                  <CartItem
                    cartItemInfo={cartItemInfo}
                    checkedItemIds={checkedItemIds}
                    setCheckedItemIds={setCheckedItemIds}
                  />
                </Style.CartItemWrapper>
              ))}
            </Style.CartItems>
          )}
          <Style.TotalCheckboxAndDeleteButtonContainer>
            <Style.TotalCheckbox
              id="total-checkbox"
              type="checkbox"
              checked={cartList.length > 0 && cartList.length === checkedItemIds.length}
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
              disabled={checkedItemIds.length === 0}
            >
              선택삭제
            </Button>
          </Style.TotalCheckboxAndDeleteButtonContainer>
        </Style.CartItemsContainer>
        <TotalPayment
          totalProductsPrice={totalProductsPrice}
          deliveryFee={totalProductsPrice > 0 ? DELIVERY_FEE : 0}
        />
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

  CartItemWrapper: styled.li`
    display: flex;

    height: 180px;

    padding: 20px;
    border-bottom: 1px ridge;
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
