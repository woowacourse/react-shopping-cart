import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CouponTop = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const CouponBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Name = styled.p<{ disabled: boolean }>`
  font-size: 16px;
  font-weight: 700;
  color: ${({ disabled }) => (disabled ? "lightgray" : "black")};
`;

export const Info = styled.p<{ disabled: boolean }>`
  font-size: 12px;
  font-weight: 500;
  color: ${({ disabled }) => (disabled ? "lightgray" : "black")};
`;
