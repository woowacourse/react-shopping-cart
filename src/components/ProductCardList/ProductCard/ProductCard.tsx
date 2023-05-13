import productThumbnail from 'assets/product-thumbnail.png';
import FlexBox from 'components/@common/FlexBox';
import { Stepper } from 'components/ProductCardList/ProductCard/Stepper';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cartState, filteredCartProductState } from 'state/CartAtom';
import styled from 'styled-components';
import type { CartProduct, Product } from 'types/product';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const [cart, setCart] = useRecoilState(cartState);
  const { id, price, name, imageUrl } = product;
  const filteredCartProduct = useRecoilValue(filteredCartProductState(id));

  const filteredCartProductQuantity = filteredCartProduct?.quantity ?? 0;

  const initialAddCartProduct = () => {
    const createCartProductFirst = () => {
      setCart((prev) => [...prev, { id, quantity: 1, product }]);
    };

    createCartProductFirst();
  };

  const renderDefaultThumbnail: React.ReactEventHandler<HTMLImageElement> = (e) => {
    e.currentTarget.src = productThumbnail;
  };

  const decreaseQuantity = () => {
    const decreased = cart.map((product) => {
      if (product.id !== id) return product;
      return { ...product, quantity: product.quantity - 1 };
    });

    setCart(decreased);
  };

  const increaseQuantity = () => {
    const increased = cart.map((product) => {
      if (product.id !== id) return product;
      return { ...product, quantity: product.quantity + 1 };
    });

    setCart(increased);
  };

  return (
    <FlexBox flexDirection="column" justify="flex-start" gap="8px" role="list">
      <ProductImgContainer>
        <ProductImage src={imageUrl} alt={name} onError={renderDefaultThumbnail} />
        <Stepper
          value={filteredCartProductQuantity}
          onClickClosed={initialAddCartProduct}
          onClickDecreaseButton={decreaseQuantity}
          onClickIncreaseButton={increaseQuantity}
        />
      </ProductImgContainer>
      <FlexBox padding="0 4px">
        <FlexBox flexDirection="column" align="flex-start">
          <Title>{name}</Title>
          <Price>{price.toLocaleString('ko-KR')}원</Price>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

const ProductImgContainer = styled.div`
  position: relative;
`;

const ProductImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 4px;
  filter: brightness(96%);
`;

const Title = styled.span`
  font-size: 14px;
`;

const Price = styled.span`
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.4px;
`;

export default ProductCard;
