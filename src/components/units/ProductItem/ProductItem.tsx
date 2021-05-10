import React from 'react';
import Styled from './ProductItem.styles';
import { ReactComponent as CartIcon } from '../../../assets/images/cart.svg';
import * as T from '../../../types';

type ProductItemProps = {
  product: T.Product;
  onClickCart: (productId: T.Product['id']) => void;
};

const ProductItem = (props: ProductItemProps) => {
  const {
    product: { id, name, image, price },
    onClickCart,
  } = props;

  const handleClickCart = () => {
    onClickCart(id);
  };

  return (
    <Styled.Root>
      <Styled.ImageWrapper>
        <Styled.Image src={image} alt={name} />
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
