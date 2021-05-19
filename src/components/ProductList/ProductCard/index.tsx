import { FC } from 'react';
import useCartAddItem from '../../../hooks/useCartItems/useCartAddItem';
import { Product } from '../../../types';
import { KRCurrency } from '../../../utils/format';
import {
  CartIconButton,
  ContentContainer,
  ProductNameText,
  ProductText,
  StyledProductCard,
} from './style';

const ProductCard: FC<Product> = (product) => {
  const { name, price, image } = product;
  const { addItem } = useCartAddItem();

  const onClickAddCart = () => {
    if (!window.confirm('장바구니에 추가하시겠습니까?')) return;

    addItem(product);
  };

  return (
    <StyledProductCard type="vertical" image={image}>
      <ContentContainer>
        <div>
          <ProductNameText data-testid="product-name">{name}</ProductNameText>
          <ProductText>{KRCurrency(price)}</ProductText>
        </div>
        <CartIconButton onClick={onClickAddCart} data-testid="add-cart-button" />
      </ContentContainer>
    </StyledProductCard>
  );
};

export default ProductCard;
