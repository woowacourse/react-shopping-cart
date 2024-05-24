import styled from "styled-components";

export const Wrapper = styled.div`
  width: 382px;
  height: 614px;
  padding: 24px 32px;
`;

export const CouponListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

export const CouponConfirmButton = styled.button`
  width: 100%;
  height: 44px;
  border-radius: 5px;
  border: 0;
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme }) => theme.color.black};
`;

export const CouponListBody = styled.section`
  display: flex;
  flex-direction: column;

  margin-top: 16px;
  margin-bottom: 32px;
`;

export const Coupon = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 0px 24px 0px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

export const CouponHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
