import styled from 'styled-components';
import Button from '../../components/shared/Button';
import Card from '../../components/shared/Card';
import Container from '../../components/shared/Container';
import PALETTE from '../../constants/palette';

export const ProductDetailCard = styled(Card)`
  margin: 0 auto;

  & img {
    box-sizing: border-box;
    padding: 2rem;
  }
`;

export const ProductDetailHeading = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  padding: 0 0 2rem 2rem;
  border-bottom: 4px solid ${PALETTE.GRAY[400]};
`;

export const ProductDetailPrice = styled(Container)`
  flex-direction: row;
  justify-content: space-between;
  padding: 2rem 1rem 3rem 1rem;

  & > span {
    font-size: 1.5rem;
  }
`;

export const ProductDetailButton = styled(Button)`
  background-color: ${PALETTE.MAROON[400]};
  color: white;
  font-weight: 600;
  width: 100%;
  font-size: 2rem;
`;
