import {
  ProductPrice,
  ProductTitle,
  StepperContainer,
  StepperButton,
  StepperQuantity,
  ModifyRow,
  DeleteButton,
  CartItemContainer,
  CartProductImage,
  ProductRow,
  CartContent,
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
