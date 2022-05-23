import React from 'react';
import styled from 'styled-components';
import CartItem from '../../components/CartItem/CartItem';
import CheckBox from '../../components/CheckBox/CheckBox';
import Spinner from '../../components/Spinner/Spinner';
import DivideLine from '../DivideLine/DivideLine';
import useCart from './useCart';

function CartPage() {
  const {
    isLoading,
    error,
    cart,
    checkedFlags,
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
    <CartContainer>
      <CartTitle>장바구니</CartTitle>
      <DivideLine />
      <CartSectionsContainer>
        <CartLeftSection>
          <CartControlContainer>
            <SelectAllContainer>
              <CheckBox
                id="select-all-checkbox"
                name="select-all-checkbox"
                checked={Object.values(checkedFlags).every(
                  (checked) => checked
                )}
                onChange={handleCheckAll}
              />
              <label htmlFor="select-all-checkbox">선택해제</label>
            </SelectAllContainer>
            <RemoveSelectedButtonContainer onClick={removeAllCartItem}>
              상품삭제
            </RemoveSelectedButtonContainer>
          </CartControlContainer>
          <StyledH3>든든배송 상품 ({cart.length}개)</StyledH3>
          <DivideLine variant="gray" />
          <ul>
            {cart.map(({ product, quantity }) => (
              <li key={product.id}>
                <CartItem
                  product={product}
                  quantity={quantity}
                  checked={checkedFlags[product.id] ?? true}
                  onChangeQuantity={handleChangeQuantity(product.id)}
                  onCheck={handleCheck(product.id)}
                  onClickRemove={removeCartItem(product.id)}
                />
                <DivideLine variant="thin" />
              </li>
            ))}
          </ul>
        </CartLeftSection>
        <CartRightSection>
          <CartRightSectionTop>
            <StyledH3>결제예상금액</StyledH3>
          </CartRightSectionTop>
          <DivideLine variant="thin" />
          <TotalPriceContainer>
            <HighlightText>결제예상금액</HighlightText>
            <HighlightText>
              {totalPrice.toLocaleString('ko-KR')}원
            </HighlightText>
          </TotalPriceContainer>
          <OrderButtonContainer>
            <PrimaryButton>
              주문하기 (
              {Object.values(checkedFlags).filter((checked) => checked).length}
              개)
            </PrimaryButton>
          </OrderButtonContainer>
        </CartRightSection>
      </CartSectionsContainer>
    </CartContainer>
  );
}

const CartContainer = styled.div`
  width: 1200px;

  ${({ theme: { media } }) => media.sm`
    width: 100%;
  `}

  ${({ theme: { media } }) => media.md`
    width: 100%;
  `}
`;

const CartTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
`;

const CartSectionsContainer = styled.div`
  display: flex;
  justify-content: space-between;

  ${({ theme: { media } }) => media.sm`
    flex-direction: column;
  `}

  ${({ theme: { media } }) => media.md`
    flex-direction: column;
  `}
`;

const CartLeftSection = styled.section`
  width: 60%;
  margin-top: 50px;

  ${({ theme: { media } }) => media.sm`
    width: 100%;
  `}

  ${({ theme: { media } }) => media.md`
    width: 100%;
  `}
`;

const CartControlContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: items-center;
`;

const SelectAllContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const RemoveSelectedButtonContainer = styled.div`
  padding: 12px 22px;
  border: 1px solid #bbbbbb;
`;

const CartRightSection = styled.section`
  width: 35%;
  height: 260px;
  margin-top: 50px;

  border: 1px solid ${({ theme: { colors } }) => colors.gray};

  ${({ theme: { media } }) => media.sm`
    width: 100%;
  `}
  ${({ theme: { media } }) => media.md`
    width: 100%;
  `};
`;

const CartRightSectionTop = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 30px;
`;

const StyledH3 = styled.h3`
  display: flex;
  align-items: center;
  font-size: 20px;
`;

const TotalPriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  margin-top: 20px;
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

const OrderButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 30px 0 30px;
`;

const PrimaryButton = styled.button`
  font-size: 24px;
  width: 100%;
  padding: 16px;
  background: ${({ theme: { colors } }) => colors.emerald};
  color: ${({ theme: { colors } }) => colors.white};
`;

export default CartPage;
