import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 24px 32px;
`;

export const CouponListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
`;

export const CouponConfirmButton = styled.button`
  width: 100%;
  background-color: ${({ theme }) => theme.color.black};
`;

export const CouponListBody = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;

  margin-top: 16px;
  margin-bottom: 32px;
`;

export const Coupon = styled.div`
  display: flex;
  flex-direction: column;

  border-top: 1px;
`;

export const CouponHeader = styled.div`
  display: flex;
  gap: 12px;
`;
