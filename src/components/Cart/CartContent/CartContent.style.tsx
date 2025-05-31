import styled from "@emotion/styled";

export const CartContentContainer = styled.main`
  width: 100%;
  height: calc(100% - 128px);
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  margin-top: 64px;
  justify-content: flex-start;
`;

export const CartContentHeader = styled.h2`
  font-weight: 700;
  font-size: 24px;
`;

export const CartContentDescription = styled.p`
  font-weight: 500;
  font-size: 12px;
`;

export const AllSelectWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 24px;
`;

export const SelectButton = styled.button`
  border: none;

  width: 24px;
  height: 24px;
`;

export const SelectIcon = styled.img`
  width: auto;
  height: auto;
`;

export const OrderConfirmButton = styled.button`
  width: 100%;
  max-width: 430px;
  background-color: #000000;
  color: #ffffff;

  bottom: 0;

  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 24px;
  padding-right: 24px;
  position: fixed;
  z-index: 100;

  font-size: 16px;
  font-weight: 700;

  a {
    text-decoration: none;
  }
  transform: translateX(-50%);
  left: 50%;

  &:disabled {
    background-color: rgb(105, 105, 105);
    cursor: not-allowed;
  }
`;

export const EmptyCartMessage = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 16px;
  font-weight: 500;
`;

export const CartContentLoading = styled.div`
  width: 100%;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 16px;
  font-weight: 500;
`;
