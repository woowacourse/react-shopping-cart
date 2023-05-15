import { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { ReactComponent as MiniCartIcon } from 'assets/mini-cart-icon.svg';
import FlexBox from 'components/@common/FlexBox';
import { cartProductsState } from 'state/cartProducts';
import type { Product } from 'types/product';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const [cartProducts, setCartProducts] = useRecoilState(cartProductsState);
  const [isQuantityStepperOpen, setIsQuantityStepperOpen] = useState(false);
  const { id, price, name, imageUrl } = product;
  const targetCartProduct = cartProducts.get(id);
  const isProductAlreadyExistInCart = !!targetCartProduct;

  const openQuantityStepper = () => {
    setIsQuantityStepperOpen(true);
  };

  const closeQuantityStepper = () => {
    setIsQuantityStepperOpen(false);
  };

  const initialAddCartProduct = () => {
    openQuantityStepper();

    setCartProducts((prev) => {
      const newCartProducts = new Map(prev.entries());

      return newCartProducts.set(id, { quantity: 1, product });
    });
  };

  const decreaseQuantity = () => {
    if (!targetCartProduct) throw new Error('장바구니에 없는 상품의 수량은 조절할 수 없습니다.');
    if (targetCartProduct.quantity === 1) closeQuantityStepper();

    setCartProducts((prev) => {
      const newCartProducts = new Map(prev.entries());
      const prevQuantity = targetCartProduct.quantity;

      return newCartProducts.set(id, { quantity: prevQuantity - 1, product });
    });
  };

  const increaseQuantity = () => {
    if (!targetCartProduct) throw new Error('장바구니에 없는 상품의 수량은 조절할 수 없습니다.');

    setCartProducts((prev) => {
      const newCartProducts = new Map(prev.entries());
      const prevQuantity = targetCartProduct.quantity;

      return newCartProducts.set(id, { quantity: prevQuantity + 1, product });
    });
  };

  const handleCloseStepperOnBlur = (e: React.FocusEvent) => {
    if (e.relatedTarget === e.currentTarget || e.currentTarget.contains(e.relatedTarget)) return;

    closeQuantityStepper();
  };

  return (
    <FlexBox flexDirection="column" justify="flex-start" gap="8px" role="list">
      <ProductImgContainer>
        <ProductImage src={imageUrl} />
        {isQuantityStepperOpen ? (
          <QuantityStepper tabIndex={1} onBlur={handleCloseStepperOnBlur}>
            <DecreaseButton onClick={decreaseQuantity}>-</DecreaseButton>
            <Quantity tabIndex={2}>{targetCartProduct?.quantity}</Quantity>
            <IncreaseButton autoFocus onClick={increaseQuantity}>
              +
            </IncreaseButton>
          </QuantityStepper>
        ) : isProductAlreadyExistInCart ? (
          <AddCartButton onClick={openQuantityStepper}>
            <Quantity>{targetCartProduct.quantity}</Quantity>
          </AddCartButton>
        ) : (
          <AddCartButton onClick={initialAddCartProduct}>
            <MiniCartIcon />
          </AddCartButton>
        )}
      </ProductImgContainer>
      <FlexBox>
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
