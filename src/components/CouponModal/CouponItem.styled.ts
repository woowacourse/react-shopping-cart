import styled from "@emotion/styled";

export const Container = styled.div<{ getPossibleToUse: boolean }>`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
  opacity: ${({ getPossibleToUse }) => (getPossibleToUse ? 1 : 0.3)};
`;

export const CouponText = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: #0a0d13;
  margin-left: 6px;
`;
