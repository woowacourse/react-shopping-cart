import { VFC } from 'react';
import { Product } from '../../../types';
import Card from '../../shared/Card';
import Text from '../../shared/Text';
import { ContentContainer } from './style';

const ProductCard: VFC<Product> = ({ name, price, imgSrc }) => {
  return (
    <Card type="vertical" width="100%" height="22rem" imgSrc={imgSrc}>
      <ContentContainer>
        <div>
          <Text margin="0 0 0.5rem 0">{name}</Text>
          <Text size="1.25rem">{price} 원</Text>
        </div>
        <img src="/icons/shopping-cart-black.svg" />
      </ContentContainer>
    </Card>
  );
};

export default ProductCard;
