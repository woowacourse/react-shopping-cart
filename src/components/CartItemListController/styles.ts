import styled from "styled-components";

const FlexBox = styled.div<{ direction?: string; justify?: string }>`
  display: flex;
  align-items: center;
  justify-content: ${({ justify = "center" }) => justify};
  flex-direction: ${({ direction = "row" }) => direction};
`;

const CartItemListControllerWrapper = styled(FlexBox)``;

const CartItemListSelect = styled.p`
  padding: 20px 0;
  label {
    margin-left: 6px;
  }
`;

const CartItemListDeleteButton = styled.button`
  width: 80px;
  height: 36px;
  background-color: white;
  border: 1px solid #dddddd;
  cursor: pointer;

  &:hover {
    background-color: #dddddd;
  }
`;

export { CartItemListControllerWrapper, CartItemListSelect, CartItemListDeleteButton };
