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

export const EmptyCartMessage = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 16px;
  font-weight: 500;
`;
