import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

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
  const { product: thisProduct } = props;
  const { id, name, price, imageUrl } = thisProduct;

  const [myCart, setMyCart] = useRecoilState(myCartState);

  const [productCount, setProductCount] = useState(() => {
    const thisProduct = myCart[id];

    return thisProduct ? thisProduct.count : 0;
  });

  const handleCartButtonClick = () => {
    setProductCount(prev => prev + 1);
  };

  useEffect(() => {
    setMyCart(prevCart => {
      const newCart = { ...prevCart };

      newCart[id] = { ...thisProduct, count: productCount };

      if (productCount === 0) {
        delete newCart[id];
      }

      return newCart;
    });
  }, [productCount]);

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
        {productCount === 0 ? (
          <CartButton onClick={handleCartButtonClick} />
        ) : (
          <Stepper
            productCount={productCount}
            setProductCount={setProductCount}
          />
        )}
      </Styled.ProductDetailWrapper>
    </Styled.ProductItem>
  );
};

export default ProductItem;
