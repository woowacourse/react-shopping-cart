import { styled } from 'styled-components';

import { useProductInCartById } from '../recoils/recoilCart';
import { useCart } from '../hooks/useCart';

import { Stepper } from './Stepper';

import { CartIcon } from '../assets/svg';
import { Product as IProduct } from '../types';

interface Props {
  item: IProduct;
}

export const Product = ({ item }: Props) => {
  const { addProductToCart } = useCart();
  const productInCart = useProductInCartById(item.id);

  const onClickCartIcon = () => {
    addProductToCart({
      id: item.id,
      quantity: 1,
      product: item,
    });
  };

  return (
    <Style.Container>
      <Style.ProductImage path={item.imageUrl} />
      <Style.ProductInfo>
        <div>
          <Style.ProductName>{item.name}</Style.ProductName>
          <Style.ProductPrice>{item.price.toLocaleString('ko-KR')}원</Style.ProductPrice>
        </div>
        {Boolean(productInCart) ? (
          <Style.StepperWrapper>
            <Stepper productId={item.id} quantity={productInCart?.quantity || 1} />
          </Style.StepperWrapper>
        ) : (
          <Style.CartIconWrapper onClick={onClickCartIcon}>
            <CartIcon fill="#AAAAAA" />
          </Style.CartIconWrapper>
        )}
      </Style.ProductInfo>
    </Style.Container>
  );
};

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

  StepperWrapper: styled.div``,

  CartIconWrapper: styled.button`
    padding: 0;
    margin: 0;
    border: none;
    background-color: inherit;
    height: fit-content;

    cursor: pointer;
  `,
};
