import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Cart } from '../../assets/cart.svg';
import { Product } from '../../types/product';
import useCart from './hooks/useCart';

type ProductItemProps = {
  product: Product;
};

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const { cart, addCart, updateCart, deleteCart } = useCart();
  const productItemQuantity = cart.find(
    (c) => c.product.id === product.id
  )?.quantity;

  const [count, setCount] = useState(productItemQuantity || 0);

  const { name, price, imageUrl } = product;

  const handleCartAmount = () => {
    addCart(product);
    setCount(1);
  };

  const limitInputNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 3) {
      e.target.value = e.target.value.slice(0, 3);
    }
  };

  const handleCartAmountChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    limitInputNumber(e);
    const newCount = Number(e.target.value);

    updateCart(newCount, product);
    setCount(newCount);

    if (newCount === 0) deleteCart(product);
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    if (Number(e.target.value) < 1) {
      setCount(0);
      deleteCart(product);
    }
  };

  return (
    <StyledProductItemWrapper data-cy="product-item">
      <StyledThumbnail src={imageUrl} alt="납작" />
      <StyledInfoWrapper>
        <div>
          <StyledProductTitle>{name}</StyledProductTitle>
          <StyledProductPrice>{price}원</StyledProductPrice>
        </div>
        <StyledAddToCart data-cy="add-cart">
          {count === 0 ? (
            <Cart onClick={handleCartAmount} />
          ) : (
            <StyledCountInput
              type="number"
              value={count}
              onChange={handleCartAmountChange}
              min={0}
              max={100}
              onBlur={handleBlur}
            />
          )}
        </StyledAddToCart>
      </StyledInfoWrapper>
    </StyledProductItemWrapper>
  );
};

const StyledProductItemWrapper = styled.li`
  width: 282px;
  height: 360px;
`;

const StyledThumbnail = styled.img`
  width: 282px;
  height: 282px;
`;

const StyledInfoWrapper = styled.div`
  margin-top: 18px;
  padding: 0 12px;

  display: flex;
  justify-content: space-between;
  line-height: 22px;
  color: #333333;
  letter-spacing: 0.5px;
`;

const StyledProductTitle = styled.div``;

const StyledProductPrice = styled.div`
  font-size: 20px;
  line-height: 27px;
`;

const StyledAddToCart = styled.div``;

const StyledCountInput = styled.input`
  width: 50px;
  text-align: center;
`;

export default ProductItem;
