import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import FlexBox from 'components/@common/FlexBox';
import { ReactComponent as MiniCartIcon } from 'assets/mini-cart-icon.svg';
import type { Product } from 'types/product';
import styled from 'styled-components';
import { cartState, filteredCartProductState } from 'state/CartAtom';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const [cart, setCart] = useRecoilState(cartState);
  const { id, price, name, imageUrl } = product;
  const filteredCartProduct = useRecoilValue(filteredCartProductState(id));
  const [isAddCartButtonActive, setIsAddCartButtonActive] = useState(false);
  const isProductAlreadyExistInCart = !!filteredCartProduct;

  const openQuantityStepper = () => {
    setIsAddCartButtonActive(true);
  };

  const closeQuantityStepper = () => {
    setIsAddCartButtonActive(false);
  };

  const initialAddCartProduct = () => {
    openQuantityStepper();

    setCart((prev) => [...prev, { id, quantity: 1, product }]);
  };

  const decreaseQuantity = () => {
    const decreased = cart.map((product) => {
      if (product.id !== id) return product;
      return { ...product, quantity: product.quantity - 1 };
    });

    if (filteredCartProduct?.quantity === 1) closeQuantityStepper();

    setCart(decreased);
  };

  const increaseQuantity = () => {
    const increased = cart.map((product) => {
      if (product.id !== id) return product;
      return { ...product, quantity: product.quantity + 1 };
    });

    setCart(increased);
  };

  const handleCloseStepperOnBlur = (e: React.FocusEvent) => {
    if (e.relatedTarget === e.currentTarget || e.currentTarget.contains(e.relatedTarget)) return;

    closeQuantityStepper();
  };

  return (
    <FlexBox flexDirection="column" justify="flex-start" gap="8px" role="list">
      <ProductImgContainer>
        <ProductImage src={imageUrl} />
        {isAddCartButtonActive ? (
          <QuantityStepper tabIndex={0} onBlur={handleCloseStepperOnBlur}>
            <DecreaseButton onClick={decreaseQuantity}>-</DecreaseButton>
            <Quantity tabIndex={0}>{filteredCartProduct?.quantity}</Quantity>
            <IncreaseButton autoFocus onClick={increaseQuantity}>
              +
            </IncreaseButton>
          </QuantityStepper>
        ) : isProductAlreadyExistInCart ? (
          <AddCartButton onClick={openQuantityStepper}>
            <Quantity>{filteredCartProduct.quantity}</Quantity>
          </AddCartButton>
        ) : (
          <AddCartButton onClick={initialAddCartProduct}>
            <MiniCartIcon />
          </AddCartButton>
        )}
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

const AddCartButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 12px;
  right: 8px;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background-color: #2ac1bc;
  cursor: pointer;
`;

const QuantityStepper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 12px;
  right: 8px;
  width: 100px;
  height: 36px;
  padding: 5px;
  border: none;
  border-radius: 9999px;
  background-color: #2ac1bc;
`;

const DecreaseButton = styled.button`
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 50%;
  background-color: #2ac1bc;
  color: #ffffff;
  font-size: 26px;
  line-height: 20px;

  :hover {
    filter: brightness(0.9);
  }
`;

const Quantity = styled.span`
  margin: 0 auto;
  font-size: 16px;
  color: #ffffff;
`;

const IncreaseButton = styled.button`
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 50%;
  background-color: #2ac1bc;
  color: #ffffff;
  font-size: 26px;
  line-height: 20px;

  :hover {
    filter: brightness(0.9);
  }
`;

export default ProductCard;
