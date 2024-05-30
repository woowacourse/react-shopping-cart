import styled from 'styled-components';

export const StyledCouponContainer = styled.section<{ isValid: boolean }>`
  border-top: 1px solid #0000001a;
  padding-bottom: 24px;

  span {
    color: ${(props) => (props.isValid ? '#000000' : '#0000001A')};
  }
`;

export const StyledCouponSelectWrapper = styled.div`
  display: flex;
  gap: 8px;
  padding: 12px 0;
`;

export const StyledCouponTitle = styled.span`
  font-size: 16px;
  font-weight: 700;
`;

export const StyledCouponDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledCouponDetail = styled.span`
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  text-align: left;
`;
