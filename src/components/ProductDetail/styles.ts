import styled from 'styled-components';
import PALETTE from '../../constants/palette';
import Button from '../shared/Button';
import Container from '../shared/Container';

export const StyledProductDetailSection = styled(Container)`
  width: 640px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

export const ProductImg = styled.img`
  width: calc(100% - 4rem);
`;

export const ProductName = styled.p`
  box-sizing: border-box;
  align-self: flex-start;
  font-size: 2rem;
  width: 100%;
  padding: 1.375rem 2rem 2rem;
  font-weight: 700;
  border-bottom: 0.25rem solid ${PALETTE.GRAY[600]};
  margin-bottom: 2rem;
`;

export const PriceContainer = styled(Container)`
  width: calc(100% - 4rem);
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 3.5rem;
  font-size: 2rem;
`;

export const AddCartButton = styled(Button)`
  width: 100%;
  background-color: ${PALETTE.BROWN[500]};
  color: white;
  font-weight: 500;
  font-size: 2rem;
  height: 6.125rem;
`;
