import { MouseEvent, VFC } from 'react';
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

interface Props extends Product {
  onClick: () => void;
}

const ProductCard: VFC<Props> = ({ onClick, ...product }) => {
  const { name, price, image_url } = product;
  const { addItem } = useCart();

  const onClickAddCart = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!window.confirm('장바구니에 추가하시겠습니까?')) return;

    addItem(product);
  };

  return (
    <StyledProductCard onClick={onClick} type="vertical" image={image_url}>
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
