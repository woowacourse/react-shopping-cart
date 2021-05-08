import styled from 'styled-components';
import { CheckoutBox, List, Template } from '../../commons';

export const Page = styled(Template)`
  background-color: #ffffff;
`;

export const Main = styled.main`
  display: flex;
  margin: 0 auto;
  width: 95%;
`;

export const ListSection = styled.section`
  display: flex;
  flex-direction: column;
  margin: 1.5rem;
  width: 63%;
`;

export const ListLabel = styled.h3`
  font-size: 1.25rem;
`;

export const CheckoutProductList = styled(List)`
  border-top: 0.0625rem solid #aaaaaa;

  & > li {
    border-top: 0.0625rem solid #aaaaaa;
  }

  & > li:last-child {
    border-bottom: 0.0625rem solid #aaaaaa;
  }
`;

export const CheckoutSection = styled.section`
  position: relative;
  display: flex;
  align-items: flex-start;
  margin: 1.5rem;
  width: 37%;
`;

export const StickyCheckoutBox = styled(CheckoutBox)`
  position: -webkit-sticky;
  position: sticky;
  top: 15%;
  margin-top: 4.875rem;
  width: 100%;
`;
