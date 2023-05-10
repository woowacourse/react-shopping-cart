import React, { ChangeEventHandler, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Cart } from '../../assets/카트.svg';
import { Product } from '../../types/product';
import useCart from './hooks/useCart';
import { cartState } from '../../atoms/cart';

type ProductItemProps = {
  product: Product;
};

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const [count, setCount] = useState(0);
  const { addCart, updateCart, deleteCart } = useCart(cartState, product);

  const { name, price, imageUrl } = product;

  const handleCartAmount = () => {
    addCart();
    setCount(1);
  };

  const handleCartAmountChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newCount = Number(e.target.value);

    updateCart(newCount);
    setCount(newCount);

    if (newCount === 0) deleteCart();
  };

  return (
    <StyledProductItemWrapper>
      <StyledThumbnail src={imageUrl} alt="납작" />
      <StyledInfoWrapper>
        <div>
          <StyledProductTitle>{name}</StyledProductTitle>
          <StyledProductPrice>{price}원</StyledProductPrice>
        </div>
        <StyledAddToCart>
          {count === 0 ? (
            <Cart onClick={handleCartAmount} />
          ) : (
            <StyledCountInput type="number" value={count} onChange={handleCartAmountChange} min={0} max={100} />
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
