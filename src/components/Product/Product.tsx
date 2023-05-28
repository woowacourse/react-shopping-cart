import * as styled from './Product.styled';

import { CartAddIcon, CartIcon } from '../../assets/svg';

import { useCartItemValue, useSetCartState } from '../../recoils/recoilCart';

import { Stepper } from '../common/Stepper/Stepper';
import { ProductType } from '../../types';
import { useMutation } from '../../hooks/useMutation';
import { FETCH_METHOD, FETCH_URL } from '../../constants';
import { useApiBaseUrlValue } from '../../recoils/recoilApiBaseUrl';
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
    <styled.Container>
      <styled.ProductImage path={item.imageUrl} />
      <styled.ProductInfo>
        <div>
          <styled.ProductName>{item.name}</styled.ProductName>
          <styled.ProductPrice>{item.price.toLocaleString('ko-KR')}원</styled.ProductPrice>
        </div>
        {cartItem ? (
          <styled.StepperWrapper>
            <Stepper cartId={cartItem.id} quantity={cartItem.quantity || 1} />
          </styled.StepperWrapper>
        ) : (
          <styled.CartIconWrapper onClick={onClickCartIcon}>
            <CartAddIcon />
          </styled.CartIconWrapper>
        )}
      </styled.ProductInfo>
    </styled.Container>
  );
};
