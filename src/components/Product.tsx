import { styled } from 'styled-components';
import { CartIcon } from '../assets/svg';

import { useCartItemValue, useSetCartState } from '../recoils/recoilCart';

import { Stepper } from './Stepper';
import { ProductType } from '../types';
import { useMutation } from '../hooks/useMutation';
import { FETCH_METHOD, FETCH_URL } from '../constants';
import { useApiBaseUrlValue } from '../recoils/recoilApiBaseUrl';
import { useEffect } from 'react';

interface Props {
  item: ProductType;
}

export const Product = ({ item }: Props) => {
  const baseUrl = useApiBaseUrlValue();
  const { mutation: addCartMutation, data: addCartResponseData } = useMutation(FETCH_METHOD.POST);

  const cartItem = useCartItemValue(item.id);

  useEffect(() => {
    if (!addCartResponseData) return;

    const cartId = addCartResponseData.location.split('/').pop();

    setCart((prev) => [
      ...prev,
      {
        id: cartId,
        quantity: 1,
        product: item,
      },
    ]);
  }, [addCartResponseData]);

  const setCart = useSetCartState();

  const onClickCartIcon = () => {
    addCartMutation(baseUrl + FETCH_URL.CART_ITEMS, {
      productId: item.id,
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
        {cartItem ? (
          <Style.StepperWrapper>
            <Stepper cartId={cartItem.id} quantity={cartItem.quantity || 1} />
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
  Container: styled.li`
    width: 282px;
  `,

  ProductImage: styled.div<{ path: string }>`
    width: 100%;
    padding-bottom: 100%;

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
