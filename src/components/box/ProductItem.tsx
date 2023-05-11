import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { CartIcon } from '../../assets';
import type { CartItem, Product } from '../../types/types';
import { Text } from '../common/Text/Text';
import InputStepper from '../common/InputStepper/InputStepper';
import { cartListState } from '../../service/atom';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const ProductItem = ({ product }: { product: Product }) => {
  const { localStorageData, internalSetLocalStorageData } = useLocalStorage<CartItem[]>(
    'cartList',
    [],
  );

  const [quantity, setQuantity] = useState<number>(
    localStorageData.find((data) => data.product.id === product.id)?.quantity ?? 0,
  );

  const [cartList, setCartList] = useRecoilState(cartListState);

  const updateCartList = () => {
    const newCartItem: CartItem = {
      quantity,
      product,
    };

    const existItemIndex = cartList.findIndex((cartItem) => cartItem.product.id === product.id);

    if (existItemIndex !== -1) {
      const newCartList = cartList.slice();
      newCartList.splice(existItemIndex, 1, newCartItem);
      setCartList(newCartList);
      return;
    }

    setCartList([...cartList, newCartItem]);
  };

  const deleteCartItem = () => {
    const existItemIndex = cartList.findIndex((cartItem) => cartItem.product.id === product.id);

    if (existItemIndex !== -1) {
      const newCartList = cartList.slice();
      newCartList.splice(existItemIndex, 1);
      setCartList(newCartList);
    }
  };

  useEffect(() => {
    if (quantity !== 0) {
      updateCartList();
      return;
    }
    deleteCartItem();
  }, [quantity]);

  useEffect(() => {
    internalSetLocalStorageData(cartList);
  }, [cartList]);

  return (
    <ProductWrapper>
      <ProductImage src={product.imageUrl} alt={product.name} />
      <ProductInfoWrapper>
        <ProductTextWrapper>
          <Text size="smallest" weight="light" color="#333333">
            {product.name}
          </Text>
          <Text size="small" weight="light" color="#333333" lineHeight="33px">
            {product.price} 원
          </Text>
        </ProductTextWrapper>
        {quantity === 0 ? (
          <CartIcon
            width={25}
            height={22}
            fill="#AAAAAA"
            style={{ transform: 'scaleX(-1)', cursor: 'pointer' }}
            onClick={() => setQuantity(1)}
          />
        ) : (
          <InputStepper
            size="small"
            quantity={quantity}
            setQuantity={(value: number) => setQuantity(value)}
          />
        )}
      </ProductInfoWrapper>
    </ProductWrapper>
  );
};

export default ProductItem;

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 282px;
`;
const ProductImage = styled.img`
  width: 100%;
  height: 282px;
`;

const ProductInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  padding: 12px;
`;

const ProductTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
