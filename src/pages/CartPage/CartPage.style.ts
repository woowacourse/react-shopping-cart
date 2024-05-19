import styled from "styled-components";

const CartHeaderTitle = styled.span`
  ${({ theme }) => theme.TEXT.Title};
`;

const CartPageLayout = styled.div`
  height: calc(100vh - 128px);
  padding: 36px 24px 0px 24px;

  overflow-y: scroll;
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;

  gap: 8px;
  margin-top: 36px;
  border-bottom: 1px;
`;

const ButtonText = styled.span`
  font-size: 16px;
  line-height: 16px;
  font-weight: 700;
`;

const OrderConfirmButton = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 430px;
  margin: 0;
`;

const EmptyCartWrapper = styled.div`
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Styled = {
  CartHeaderTitle,
  CartPageLayout,
  CheckBoxWrapper,
  ButtonText,
  OrderConfirmButton,
  EmptyCartWrapper,
};

export default Styled;
