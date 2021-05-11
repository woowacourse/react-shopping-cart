import { VFC } from 'react';
import useFetchCartRedux from '../../../hooks/useFetchCartRedux';
import { Product } from '../../../types';
import Card from '../../shared/Card';
import IconButton from '../../shared/IconButton';
import Text from '../../shared/Text';
import { ContentContainer } from './style';

const ProductCard: VFC<Product> = (product) => {
  const { name, price, image } = product;
  const { addItem } = useFetchCartRedux();

  const onClickAddCart = () => {
    if (!window.confirm('장바구니에 추가하시겠습니까?')) return;

    addItem(product);
  };

  return (
    <Card type="vertical" width="17.625rem" height="22rem" image={image}>
      <ContentContainer>
        <div>
          <Text margin="0 0 0.5rem 0" data-testid="product-name">
            {name}
          </Text>
          <Text size="1.25rem">{price} 원</Text>
        </div>
        <IconButton
          image="/icons/shopping-cart-black.svg"
          width="3rem"
          height="3rem"
          data-testid="add-cart-button"
          onClick={onClickAddCart}
        />
      </ContentContainer>
    </Card>
  );
};

export default ProductCard;
