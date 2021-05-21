import React, { ReactElement } from 'react';
import Styled from './ProductItem.styles';
import { ReactComponent as CartIcon } from '../../../assets/images/cart.svg';
import * as T from '../../../types';
import noImageURL from '../../../assets/images/no_image.jpg';
import { toPriceFormat } from '../../../utils';

interface IProps {
  product: T.Product;
  onClickCart: (product: T.Product) => void;
}

const ProductItem = (props: IProps): ReactElement => {
  const { product, onClickCart } = props;
  const { name, image, price } = product;

  const handleClickCart = () => {
    onClickCart(product);
  };

  return (
    <Styled.Root>
      <Styled.ImageWrapper>
        <Styled.Image src={image || noImageURL} alt={name} />
      </Styled.ImageWrapper>
      <Styled.Content>
        <Styled.Detail>
          <Styled.Title>{name}</Styled.Title>
          <Styled.Price>{toPriceFormat(price)}</Styled.Price>
        </Styled.Detail>
        <Styled.CartButton onClick={handleClickCart}>
          <CartIcon />
        </Styled.CartButton>
      </Styled.Content>
    </Styled.Root>
  );
};

export default ProductItem;
