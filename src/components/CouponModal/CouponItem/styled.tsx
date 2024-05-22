import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 1.2rem;
  margin-bottom: 1.2rem;
`;

export const CouponItemHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1.2rem;
`;

export const CouponItemContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CouponName = styled.h3`
  ${props => props.theme.typography.boldLabel};
`;

export const CouponDescription = styled.p`
  ${props => props.theme.typography.label};
`;

export const Hr = styled.hr`
  width: 100%;
  height: 0.1rem;
  margin-bottom: 1.2rem;
  border: 0.1rem solid ${props => props.theme.color.black10};
`;
