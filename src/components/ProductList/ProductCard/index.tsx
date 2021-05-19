import { VFC } from 'react';
import useCart from '../../../hooks/useCart';
import { Product } from '../../../types';
import { KRCurrency } from '../../../utils/format';
import {
  CartIconButton,
  ContentContainer,
  ProductNameText,
  PriceText,
  ProductTextContainer,
  StyledProductCard,
} from './style';

const ProductCard: VFC<Product> = (product) => {
  const { name, price, image } = product;
  const { addItem } = useCart();

  const onClickAddCart = () => {
    if (!window.confirm('장바구니에 추가하시겠습니까?')) return;

    addItem(product);
  };

  return (
    <StyledProductCard type="vertical" image={image}>
      <ContentContainer>
        <ProductTextContainer>
          <ProductNameText data-testid="product-name">{name}</ProductNameText>
          <PriceText>{KRCurrency(price)}</PriceText>
        </ProductTextContainer>
        <CartIconButton onClick={onClickAddCart} data-testid="add-cart-button" />
      </ContentContainer>
    </StyledProductCard>
  );
};

export default ProductCard;
