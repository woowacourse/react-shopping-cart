import styled from 'styled-components';

export const CouponModalButton = styled.button`
  background-color: var(--black-color-3);

  font-family: var(--font-Noto-Sans-KR);
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--white-color-1);

  box-sizing: border-box;
  border-radius: 0.5rem;
  padding: 1.1rem;
`;

export const CouponModalCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;


export const CouponModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  margin: 1.6rem 0;
`;
