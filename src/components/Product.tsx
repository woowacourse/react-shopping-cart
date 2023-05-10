import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { CartIcon } from '../assets/svg';
import { countInCartState } from '../atom';
import Stepper from './Stepper';

export default function Product({ data }: any) {
  const [, setCountInCart] = useRecoilState(countInCartState);
  const [isSelected, setIsSelected] = useState(false);

  const handleClickCartIcon = () => {
    setCountInCart((prev) => prev + 1);
    setIsSelected(true);
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
          <Stepper initCount={1} />
        ) : (
          <Style.CartIconWrapper onClick={handleClickCartIcon}>
            <CartIcon fill="#AAAAAA" />
          </Style.CartIconWrapper>
        )}
      </Style.ProductInfo>
    </Style.Container>
  );
}

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

  CartIconWrapper: styled.button`
    padding: 0;
    margin: 0;
    border: none;
    background-color: inherit;
    height: fit-content;

    cursor: pointer;
  `,
};
