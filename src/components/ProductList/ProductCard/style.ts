import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Container from '../../shared/Container';
import IconButton from '../../shared/IconButton';
import Text from '../../shared/Text';

export const ProductCartContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

export const ProductCardLink = styled(Link)`
  &:hover {
    & * {
      text-decoration: underline;
    }
  }
`;

export const ContentContainer = styled(Container)`
  padding: 0 3.5rem 1rem 0.875rem;
`;

ContentContainer.defaultProps = {
  direction: 'row',
  justifyContent: 'space-between',
  alignCenter: true,
};

export const ProductNameText = styled(Text)`
  margin-bottom: 0.5rem;
`;

export const ProductText = styled(Text)`
  size: 1.25rem;
`;

export const CartIconButton = styled(IconButton)`
  position: absolute;
  width: 1.875rem;
  height: 1.875rem;
  right: 1.25rem;
  top: 19rem;
`;

CartIconButton.defaultProps = {
  image: process.env.PUBLIC_URL + '/icons/shopping-cart-black.svg',
};
