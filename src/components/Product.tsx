import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { CartIcon } from '../assets/svg';
import { productsInCartState } from '../atom';
import Stepper from './Stepper';

function Product({ data }: any) {
  const [productsInCart, setProductsInCart] = useRecoilState(productsInCartState);
  const [productInCart] = useState(productsInCart.find((product) => product.id === data.id));
  const isInCart = Boolean(productInCart);

  const [isSelected, setIsSelected] = useState(isInCart);

  const handleClickCartIcon = () => {
    setIsSelected(true);
    setProductsInCart((prev) => [
      ...prev,
      {
        id: data.id,
        quantity: 1,
      },
    ]);
  };

  return (
    <Style.Container>
      <Style.ProductImage path={data.imageUrl} />
      <Style.ProductInfo>
        <div>
          <Style.ProductName>{data.name}</Style.ProductName>
          <Style.ProductPrice>{data.price.toLocaleString('ko-KR')}원</Style.ProductPrice>
        </div>
        {isSelected ? (
          <Style.StepperWrapper isInCart={isInCart}>
            <Stepper initCount={productInCart?.quantity} productId={data.id} />
          </Style.StepperWrapper>
        ) : (
          <Style.CartIconWrapper onClick={handleClickCartIcon}>
            <CartIcon fill="#AAAAAA" />
          </Style.CartIconWrapper>
        )}
      </Style.ProductInfo>
    </Style.Container>
  );
}

export default React.memo(Product);

const Style = {
  Container: styled.div`
    width: 282px;
  `,

  ProductImage: styled.div<{ path: string }>`
    width: 282px;
    height: 282px;

    background-image: ${(props) => `url(${props.path})`};
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  `,

  ProductInfo: styled.div`
    display: flex;
    justify-content: space-between;

    padding: 18px 12px 0 12px;
    letter-spacing: 0.5px;
  `,

  ProductName: styled.p`
    margin-bottom: 8px;
  `,

  ProductPrice: styled.p`
    font-size: 20px;
  `,

  StepperWrapper: styled.div<{ isInCart: boolean }>`
    /* animation: drawStepper 0.3s ease-in-out; */
    /* animation: ${(props) => !props.isInCart && 'drawStepper 0.3s ease-in-out'}; */
  `,

  CartIconWrapper: styled.button`
    padding: 0;
    margin: 0;
    border: none;
    background-color: inherit;
    height: fit-content;

    cursor: pointer;
  `,
};
