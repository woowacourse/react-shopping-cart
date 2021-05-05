import React from 'react';
import Styled from './ProductItem.styles';
import { ReactComponent as CartIcon } from '../../../assets/images/cart.svg';
import defaultImageUrl from '../../../assets/images/default_product_item.png';

type ProductItemProps = {
  imageUrl?: string;
  title: string;
  price: number;
};

const ProductItem = (props: ProductItemProps) => {
  const { imageUrl, title, price } = props;

  return (
    <Styled.Root>
      <Styled.ImageWrapper>
        <Styled.Image src={imageUrl} alt={title} />
      </Styled.ImageWrapper>
      <Styled.Content>
        <Styled.Detail>
          <Styled.Title>{title}</Styled.Title>
          <Styled.Price>{price.toLocaleString('ko-KR')}</Styled.Price>
        </Styled.Detail>
        <Styled.CartButton>
          <CartIcon />
        </Styled.CartButton>
      </Styled.Content>
    </Styled.Root>
  );
};

ProductItem.displayName = 'ProductItem';

ProductItem.defaultProps = {
  imageUrl: defaultImageUrl,
};

export default ProductItem;
