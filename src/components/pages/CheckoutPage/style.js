import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
`;

export const Main = styled.main`
  display: flex;
  margin: 0 auto;
  width: 95%;
  height: 100%;
`;

export const CartListSection = styled.section`
  display: flex;
  flex-direction: column;
  margin: 1.5rem;
  width: 63%;
  height: 100%;
`;

export const ListLabel = styled.h3`
  font-size: 1.25rem;
`;

export const CheckoutSection = styled.section`
  position: relative;
  display: flex;
  align-items: flex-start;
  margin: 1.5rem;
  width: 37%;
  height: 100%;
`;

export const Sticky = styled.section`
  position: -webkit-sticky;
  position: sticky;
  top: 15%;
  margin-top: 4.875rem;
  width: 100%;
`;
