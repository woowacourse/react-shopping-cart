import React from 'react';
import styled from 'styled-components';
import CartItem from '../../components/CartItem/CartItem';
import CheckBox from '../../components/CheckBox/CheckBox';
import Spinner from '../../components/Spinner/Spinner';
import useCart from './useCart';

function CartPage() {
  const {
    isLoading,
    error,
    cart,
    totalPrice,
    handleChangeQuantity,
    handleCheck,
    handleCheckAll,
    removeCartItem,
    removeAllCartItem,
  } = useCart();

  if (error) {
    alert(error);
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <h2 style={{ fontSize: '24px', fontWeight: '600', textAlign: 'center' }}>
        장바구니
      </h2>
      <StyledHr />
      <div style={{ display: 'flex' }}>
        <section style={{ width: '60%', marginTop: '50px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'items-center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CheckBox
                id="select-all-checkbox"
                name="select-all-checkbox"
                checked={cart.every((item) => item.checked)}
                onChange={handleCheckAll}
              />
              <label
                style={{ paddingLeft: '7px' }}
                htmlFor="select-all-checkbox"
              >
                선택해제
              </label>
            </div>
            <button
              style={{ padding: '12px 22px', border: '1px solid #bbbbbb' }}
              onClick={removeAllCartItem}
            >
              상품삭제
            </button>
          </div>
          <h3
            style={{ display: 'flex', alignItems: 'center', fontSize: '20px' }}
          >
            든든배송 상품 ({cart.length}개)
          </h3>
          <StyledHr variant="gray" />
          <ul>
            {cart.map(
              (item) =>
                item.product && (
                  <li key={item.id}>
                    <CartItem
                      product={item.product}
                      quantity={item.quantity}
                      checked={item.checked}
                      onChangeQuantity={handleChangeQuantity(item.id)}
                      onCheck={handleCheck(item.id)}
                      onClickRemove={removeCartItem(item.id)}
                    />
                    <StyledHr variant="thin" />
                  </li>
                )
            )}
          </ul>
        </section>
        <CartRightSection>
          <CartRightSectionTop>
            <CartTitle>결제예상금액</CartTitle>
          </CartRightSectionTop>
          <StyledHr variant="thin" />
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0 30px',
                marginTop: '20px',
              }}
            >
              <HighlightText>결제예상금액</HighlightText>
              <HighlightText>
                {totalPrice.toLocaleString('ko-KR')}원
              </HighlightText>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '30px 30px 0 30px',
              }}
            >
              <PrimaryButton>
                주문하기({cart.filter((item) => item.checked).length}개)
              </PrimaryButton>
            </div>
          </div>
        </CartRightSection>
      </div>
    </>
  );
}

type StyledHrProps = {
  variant?: string;
};

const StyledHr = styled.hr`
  width: 100%;
  border: ${({ variant }: StyledHrProps) => {
    if (variant === 'gray') return '2px solid #aaaaaa';

    if (variant === 'thin') return '1px solid #aaaaaa';

    return '2px solid black';
  }};
`;

const CartRightSection = styled.section`
  width: 35%;
  height: 260px;
  margin-left: 5%;
  margin-top: 80px;

  border: 1px solid #dddddd;
`;

const CartRightSectionTop = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 30px;
`;

const CartTitle = styled.h3`
  display: flex;
  align-items: center;
  font-size: 20px;
`;

const HighlightText = styled.span`
  position: relative;
  font-weight: 700;
  display: inline-block;
  text-align: center;
  padding: 0 2px;
  font-size: 20px;

  ::after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 8px;
    background-color: #2ac1bc;
    opacity: 0.5;
    z-index: ${({ theme: { zPriorities } }) => zPriorities.behind};
  }
`;

const PrimaryButton = styled.button`
  background: #2ac1bc;
  font-size: 24px;
  color: white;
  width: 100%;
  padding: 16px;
`;

export default CartPage;
