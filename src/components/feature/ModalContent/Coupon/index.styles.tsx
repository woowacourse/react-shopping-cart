import styled from '@emotion/styled';

export const Container = styled.div`
  width: 380px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CouponList = styled.div<{disabled: boolean}>`
  display: flex;
  flex-direction: column;
  gap: 16px;

  color: ${({disabled}) => (disabled ? '#D9D9D9' : '#000')};
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

export const Description = styled.div`
  font-size: 12px;
`;
