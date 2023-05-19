import * as Styled from './CartItem.styles.tsx';
import StepperInput from '../../StepperInput/StepperInput.tsx';

const CartItem = () => {
  return (
    <>
      <ul>
        <Styled.CartItem>
          <Styled.CartItemCheckBox type='checkbox' />
          <Styled.ItemImageOverflowContainer>
            <Styled.ItemImageContainer>
              <Styled.ItemImage src='http://image.elandgift.com/images/web/Product/20220404/JW20220404130056685001.jpg' />
            </Styled.ItemImageContainer>
          </Styled.ItemImageOverflowContainer>
          <Styled.ItemTitle>야채바삭 김말이</Styled.ItemTitle>

          <Styled.itemFunctionWrapper>
            <Styled.DeleteButton>
              <Styled.TrashLogo />
            </Styled.DeleteButton>
            <StepperInput />
            <span>5100원</span>
          </Styled.itemFunctionWrapper>
        </Styled.CartItem>
      </ul>
      <Styled.CartItemBorder />
    </>
  );
};

export default CartItem;
