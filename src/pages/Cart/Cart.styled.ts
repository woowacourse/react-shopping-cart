import styled from 'styled-components';
import { NoCartItemContainer } from '../../components/CartContent/CartContent.styled';

export const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 3.6rem 2.4rem 10.4rem 2.4rem;
  box-sizing: border-box;
  height: 100%;
`;

export const SuspenseFallBack = styled(NoCartItemContainer)``;
