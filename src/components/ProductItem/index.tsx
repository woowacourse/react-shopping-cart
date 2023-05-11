import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Cart } from '../../assets/cart.svg';
import { Product } from '../../types/product';
import useCart from './hooks/useCart';
import { cartState } from '../../atoms/cart';

type ProductItemProps = {
  product: Product;
};

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const { cart, addCart, updateCart, deleteCart } = useCart(cartState, product);
  const productItemQuantity = cart.find(
    (c) => c.product.id === product.id
  )?.quantity;

  const [count, setCount] = useState(productItemQuantity || 0);

  const { name, price, imageUrl } = product;

  const handleCartAmount = () => {
    addCart();
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

    updateCart(newCount);
    setCount(newCount);

    if (newCount === 0) deleteCart();
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    if (Number(e.target.value) < 1) {
      setCount(0);
      deleteCart();
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
        <StyledAddToCart>
          {count === 0 ? (
            <Cart data-cy="add-cart" onClick={handleCartAmount} />
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
