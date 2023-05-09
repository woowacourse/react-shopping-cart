import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import myCartState from '../../recoil/myCartState';
import { Product } from '../../types/Product';

import * as Styled from './ProductItem.styled';
import Stepper from '../commons/Stepper/Stepper';
import SquareImage from '../commons/SquareImage/SquareImage';
import CartButton from '../CartButton/CartButton';

interface ProductItemProps {
  product: Product;
}

const ProductItem = (props: ProductItemProps) => {
  const {
    product: { id, name, price, imageUrl },
  } = props;

  const product = useRecoilValue(myCartState).find(
    product => product.id === id
  );

  const [count, setCount] = useState(product ? product.count : 0);

  const handleCartButtonClick = () => {
    setCount(prev => prev + 1);
  };

  return (
    <Styled.ProductItem>
      <SquareImage src={imageUrl} alt={name} size="xl" />
      <Styled.ProductDetailWrapper>
        <div>
          <Styled.NameParagraph>{name}</Styled.NameParagraph>
          <Styled.PriceParagraph>
            {price.toLocaleString('ko-KR')} 원
          </Styled.PriceParagraph>
        </div>
        {count === 0 ? (
          <CartButton onClick={handleCartButtonClick} />
        ) : (
          <Stepper count={count} setCount={setCount} />
        )}
      </Styled.ProductDetailWrapper>
    </Styled.ProductItem>
  );
};

export default ProductItem;
