import { MouseEvent, useEffect, VFC } from 'react';
import useCart from '../../../service/hooks/useCart';
import { Product } from '../../../types';
import { FetchError } from '../../../utils/error';
import { KRCurrency } from '../../../utils/format';
import {
  CartIconButton,
  ContentContainer,
  ProductNameText,
  PriceText,
  ProductTextContainer,
  StyledProductCard,
} from './style';

interface Props {
  product: Product;
  onClick: () => void;
}

const ProductCard: VFC<Props> = ({ onClick, product }) => {
  const { name, price, imageUrl } = product;
  const { addItem } = useCart();

  const onClickAddCart = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    addItem(product);
  };

  return (
    <StyledProductCard onClick={onClick} type="vertical" image={imageUrl}>
      <ContentContainer>
        <ProductTextContainer>
          <ProductNameText data-testid="product-name">{name}</ProductNameText>
          <PriceText>{KRCurrency(price)}</PriceText>
        </ProductTextContainer>
        <CartIconButton type="button" onClick={onClickAddCart} data-testid="add-cart-button" />
      </ContentContainer>
    </StyledProductCard>
  );
};

export default ProductCard;
