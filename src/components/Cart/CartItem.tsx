import styled from '@emotion/styled';
import {
  ProductPrice,
  ProductTitle,
  StepperContainer,
  StepperButton,
  StepperQuantity,
} from './Cart.styles';

function CartItem() {
  return (
    <CartItemContainer>
      <ModifyRow>
        <input type="checkbox" />
        <DeleteButton>삭제</DeleteButton>
      </ModifyRow>

      <ProductRow>
        <CartProductImage src={''} />
        <CartContent>
          <ProductTitle>상품이름A</ProductTitle>
          <ProductPrice>35,000원</ProductPrice>
          <StepperContainer>
            <StepperButton disabled={true}>−</StepperButton>
            <StepperQuantity>2</StepperQuantity>
            <StepperButton>＋</StepperButton>
          </StepperContainer>
        </CartContent>
      </ProductRow>
    </CartItemContainer>
  );
}

export default CartItem;

export const CartItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 16px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

export const ModifyRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
`;

export const DeleteButton = styled.button`
  width: 40px;
  height: 24px;
  font-size: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background: white;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

export const ProductRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

export const CartProductImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
  background: #eee;
`;

export const CartContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 4px;
  flex: 1;
`;
