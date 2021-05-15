import React from 'react';
import { ReactComponent as CartIcon } from 'assets/images/cart.svg';
import * as T from 'types';
import noImageURL from 'assets/images/no_image.jpg';
import Styled from './ProductItem.styles';

type ProductItemProps = {
  product: T.Product;
  onClickItem: (product: T.Product) => void;
  onClickCart: (product: T.Product) => void;
};

const ProductItem = (props: ProductItemProps) => {
  const { product, onClickCart, onClickItem } = props;
  const { name, image, price } = product;

  const handleClickCart = () => {
    onClickCart(product);
  };

  const handleClickItem = () => {
    onClickItem(product);
  };

  return (
    <Styled.Root onClick={handleClickItem}>
      <Styled.ImageWrapper>
        <Styled.Image src={image || noImageURL} alt={name} />
      </Styled.ImageWrapper>
      <Styled.Content>
        <Styled.Detail>
          <Styled.Title>{name}</Styled.Title>
          <Styled.Price>{price.toLocaleString('ko-KR')}</Styled.Price>
        </Styled.Detail>
        <Styled.CartButton onClick={handleClickCart}>
          <CartIcon />
        </Styled.CartButton>
      </Styled.Content>
    </Styled.Root>
  );
};

export default ProductItem;
