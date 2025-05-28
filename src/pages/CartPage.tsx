import styled from '@emotion/styled';
import CartList from '../components/Cart/CartList';
import Header from '../components/Header/Header';
import CartPrice from '../components/Cart/CartPrice';
import { infoIcon } from '../assets';
import {
  CheckboxContainer,
  HiddenCheckbox,
  ModifyRow,
  StyledCheckbox,
} from '../components/Cart/Cart.styles';
import { useEffect, useState } from 'react';
import { getCartItems } from '../apis/cart';
import { CartProduct } from '../types/cart';

function CartPage() {
  const [isChecked, setIsChecked] = useState(true);
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);

  useEffect(() => {
    const saveState = async () => {
      const cartList = await getCartItems();
      setCartItems(cartList);
    };
    saveState();
  }, []);

  return (
    <>
      <Header title="SHOP" />
      <Container>
        <CartHeader>
          <Title>장바구니</Title>
          <Description>현재 {cartItems.length}종류의 상품이 담겨있습니다.</Description>
        </CartHeader>
        <CartSelectAll>
          <ModifyRow>
            <CheckboxContainer>
              <HiddenCheckbox
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <StyledCheckbox checked={isChecked} />
            </CheckboxContainer>
            <span>전체 선택</span>
          </ModifyRow>
        </CartSelectAll>

        <CartList cartItems={cartItems} setCartItems={setCartItems} />

        <CartInfo>
          <InfoIconImage src={infoIcon} alt="infoIcon" />
          <p>총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.</p>
        </CartInfo>

        <CartFooter>
          <CartPrice title="주문 금액" price={70000} />
          <CartPrice title="배송비" price={70000} />
          <CartPrice title="총 결제 금액" price={70000} />
        </CartFooter>
      </Container>
      <CloseButton>결제하기</CloseButton>
    </>
  );
}

export default CartPage;

const Container = styled.div`
  padding: 0 24px;
  overflow-y: auto;
`;

const CartHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 36px;
  gap: 12px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #000;
`;

const Description = styled.p`
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  line-height: 150%;
  color: #0a0d13;
`;

const CartSelectAll = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 36px 0 20px 0;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  line-height: 150%;
  color: #0a0d13;
`;

const CartInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  margin: 52px 0 13px 0;
`;

const CartFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const InfoIconImage = styled.img`
  width: 13px;
  height: 13px;
`;

export const CloseButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: white;
  height: 64px;
  background: #000000;
  font-weight: 700;
  font-size: 15px;
  line-height: 100%;
  text-align: center;
  cursor: pointer;
`;
