import { FC } from 'react';
import { Link } from 'react-router-dom';
import useCartAddItem from '../../../hooks/useCartItems/useCartAddItem';
import { Product } from '../../../types';
import { KRCurrency } from '../../../utils/format';
import Card from '../../shared/Card';
import {
  CartIconButton,
  ContentContainer,
  ProductCardLink,
  ProductCartContainer,
  ProductNameText,
  ProductText,
} from './style';

const ProductCard: FC<Product> = (product) => {
  const { name, price, image } = product;
  const { addItem } = useCartAddItem();

  const onClickAddCart = () => {
    if (!window.confirm('장바구니에 추가하시겠습니까?')) return;

    addItem(product);
  };

  return (
    <ProductCartContainer>
      <ProductCardLink to={`/productDetail/${product.id}`}>
        <Card type="vertical" image={image} width="17.625rem" height="22rem">
          <ContentContainer>
            <div>
              <ProductNameText data-testid="product-name">{name}</ProductNameText>
              <ProductText>{KRCurrency(price)}</ProductText>
            </div>
          </ContentContainer>
        </Card>
      </ProductCardLink>
      <CartIconButton onClick={onClickAddCart} data-testid="add-cart-button" />
    </ProductCartContainer>
  );
};

export default ProductCard;
