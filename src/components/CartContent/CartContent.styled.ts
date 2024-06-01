import styled from 'styled-components';
import { Button } from '../ItemCard/ItemCard.styled';

export const CartContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

export const ItemListWrapper = styled.div`
  margin-bottom: 1.6rem;
`;

export const NoCartItemContainer = styled.p`
  width: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.6rem;
  text-align: center;
`;

export const SampleButton = styled(Button)``;
