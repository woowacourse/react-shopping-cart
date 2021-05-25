import React, { useState, ReactElement } from 'react';
import Styled from './ProductItem.styles';
import { ReactComponent as CartIcon } from '../../../assets/images/cart.svg';
import * as T from '../../../types';
import noImageURL from '../../../assets/images/no_image.jpg';
import { toPriceFormat } from '../../../utils';

interface IProps {
  product: T.Product;
  onClickCart: (productId: T.Product['productId']) => void;
}

const ProductItem = (props: IProps): ReactElement => {
  const { product, onClickCart } = props;
  const { productId, name, imageUrl, price } = product;
  const [currentImageUrl, setCurrentImageUrl] = useState(imageUrl);

  const handleClickCart = () => {
    onClickCart(productId);
  };

  const handleImageLoadError = () => {
    setCurrentImageUrl(noImageURL);
  };

  return (
    <Styled.Root>
      <Styled.ImageWrapper>
        <Styled.Image src={currentImageUrl || noImageURL} alt={name} onError={handleImageLoadError} />
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
