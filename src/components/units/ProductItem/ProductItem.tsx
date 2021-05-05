import React from 'react';
import Styled from './ProductItem.styles';
import { ReactComponent as CartIcon } from '../../../assets/images/cart.svg';
import defaultImageUrl from '../../../assets/images/default_product_item.png';

type ProductItemProps = {
  imageUrl: string;
  title: string;
  price: number;
};

const ProductItem = (props: ProductItemProps) => {
  const { imageUrl = defaultImageUrl, title = '아주아주 길고 길고 기나긴 상품 이름', price = 30000 } = props;

  return (
    <Styled.Root>
      <Styled.Image src={imageUrl} alt={title} />
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

export default ProductItem;
