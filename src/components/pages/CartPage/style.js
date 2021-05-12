import styled from 'styled-components';
import { BAEMIN_CYAN } from '../../../constants';
import { Button, CheckoutBox, List, Template } from '../../commons';

export const Page = styled(Template)`
  background-color: #ffffff;
`;

export const Main = styled.main`
  display: flex;
  margin: 0 auto;
  width: 95%;
`;

export const OrderOptionsSection = styled.section`
  display: flex;
  flex-direction: column;
  margin: 1.5rem;
  width: 63%;
`;

export const OrderOptionsController = styled.p`
  display: flex;
  justify-content: space-between;
`;

export const DeleteButton = styled(Button)`
  width: 7.375rem;
  height: 3.125rem;
  font-size: 1rem;
  color: #333333;
  border: 0.0625rem solid #bbbbbb;

  &:disabled {
    cursor: default;
    color: #bbbbbb;
  }
`;

export const ListLabel = styled.h3`
  font-size: 1.25rem;
`;

export const CartProductList = styled(List)`
  border-top: 0.0625rem solid #aaaaaa;

  & > li {
    border-top: 0.0625rem solid #aaaaaa;
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

export const EmptyCartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const EmptyCartText = styled.h3`
  margin: 6rem 0;
  font-family: 'BMYEONSUNG';
  font-weight: 200;
  color: #bbbbbb;
  font-size: 7rem;
  letter-spacing: 0.7rem;
  text-shadow: 0.75rem 0.75rem 1rem rgba(0, 0, 0, 0.15);
`;

export const ToProductListButton = styled(Button)`
  font-size: 1.25rem;
  background-color: ${BAEMIN_CYAN};
  color: #ffffff;
  width: 12rem;
  height: 3rem;
`;
