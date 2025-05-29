import Styled from "@emotion/styled";

export const QuantityButtonContainer = Styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const QuantityButton = Styled.button`
  width: 24px;
  height: 24px;
  border: 1.5px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: white;
`;

export const QuantityButtonText = Styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #0A0D13;
  margin: 0 12px;
`;
