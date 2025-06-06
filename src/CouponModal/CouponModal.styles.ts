import styled from "@emotion/styled";

export const CouponContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0;
`;

export const CouponItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px 0;
  border-top: 1px solid rgba(51, 51, 51, 0.25);
  border-radius: 5px;
  gap: 10px;
`;

export const CouponDescription = styled.p`
  font-weight: 500;
  font-size: 12px;
  color: #333333;
`;

export const Label = styled.div`
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 8px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  width: 100%;
`;

export const Button = styled.button`
  width: 100%;
  height: 48px;
  border: 1px solid rgba(51, 51, 51, 0.25);
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;
