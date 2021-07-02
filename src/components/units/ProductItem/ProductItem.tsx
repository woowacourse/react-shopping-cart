import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as CartIcon } from 'assets/images/cart.svg';
import * as T from 'types';
import { toPriceFormat } from 'utils';
import useImageFallback from 'hooks/useImageFallback';
import Styled from './ProductItem.styles';

interface Props {
  product: T.Product;
  onClickCart: (productId: T.Product['productId']) => void;
}

const ProductItem = (props: Props): ReactElement => {
  const { product, onClickCart } = props;
  const { productId, name, imageUrl, price } = product;

  const { imageUrl: currentImageUrl, onImageLoadError } = useImageFallback(imageUrl);

  const handleClickCart = () => {
    onClickCart(productId);
  };

  return (
    <Styled.Root>
      <Link to={{ pathname: `/product/${product.productId}`, state: { product } }}>
        <Styled.ImageWrapper>
          <Styled.Image src={currentImageUrl} alt={name} onError={onImageLoadError} />
        </Styled.ImageWrapper>
      </Link>
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
