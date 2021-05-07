import styled from '@emotion/styled';

const CartItem = styled.li`
  display: flex;
  align-items: flex-start;
  width: 100%;
  padding: 30px 0;
  border-bottom: 1.5px solid #cccccc;
`;

const CartItemImage = styled.img`
  width: 144px;
  height: 144px;
  object-fit: contain;
  margin-left: 15px;
  border: 1px solid ${(props) => props.theme.borderColor.darkGrey};
  box-sizing: border-box;
  border-radius: 2px;
`;

const CartItemTitle = styled.div`
  flex: 1;
  margin-left: 20px;
  font-size: 20px;
  letter-spacing: 0.5px;
`;

const CartItemOption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 20px;
`;

const CartItemDelete = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  margin-bottom: 20px;
`;

const CartItemPrice = styled.div`
  font-size: 16px;
`;

const QuantityInputWrapper = styled.div`
  margin-bottom: 13px;
`;

export default {
  CartItem,
  CartItemImage,
  CartItemTitle,
  CartItemOption,
  CartItemDelete,
  CartItemPrice,
  QuantityInputWrapper,
};
