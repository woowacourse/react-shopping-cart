import styled from 'styled-components';
import Card from '../../shared/Card';
import Container from '../../shared/Container';
import IconButton from '../../shared/IconButton';
import Text from '../../shared/Text';

export const StyledProductCard = styled(Card)`
  width: 17.625rem;
  height: 22rem;
  cursor: pointer;
  border-radius: 0.5rem;
`;

export const ContentContainer = styled(Container)`
  padding: 0 0.875rem;

  img {
    width: 2rem;
    height: 2rem;
  }
`;

ContentContainer.defaultProps = {
  direction: 'row',
  justifyContent: 'space-between',
  alignCenter: true,
};

export const ProductTextContainer = styled(Container)`
  padding-right: 0.75rem;
  width: 80%;
`;

export const ProductNameText = styled(Text)`
  margin-bottom: 0.5rem;
  height: 1.25rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const PriceText = styled(Text)`
  size: 1.25rem;
`;

export const CartIconButton = styled(IconButton)`
  width: 1.875rem;
  height: 1.875rem;
`;

CartIconButton.defaultProps = {
  image: '/icons/shopping-cart-black.svg',
};
