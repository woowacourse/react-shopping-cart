import styled from "@emotion/styled";

export const CouponItemWrapper = styled.div<{ isCouponAvailable: boolean }>`
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  opacity: ${({ isCouponAvailable }) => (isCouponAvailable ? 1 : 0.5)};
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
