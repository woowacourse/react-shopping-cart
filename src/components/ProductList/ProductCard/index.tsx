import { FC } from 'react';
import { ALERT, CONFIRM } from '../../../constants/message';
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
    if (!window.confirm(CONFIRM.ADD_CART)) return;

    addItem(product);
    alert(ALERT.SUCCESS_ADD_CART);
  };

  return (
    <ProductCartContainer>
      <ProductCardLink to={`/productDetail/${product.id}`}>
        <Card type="vertical" image={image} width="17.625rem">
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
