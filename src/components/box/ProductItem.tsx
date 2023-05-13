import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { CartIcon } from '../../assets';
import type { CartItem, Product } from '../../types/types';
import { Text } from '../common/Text/Text';
import InputStepper from '../common/InputStepper/InputStepper';
import { cartListState } from '../../store/atom';

const ProductItem = ({ product }: { product: Product }) => {
  const [cartList, setCartList] = useRecoilState(cartListState);

  const existItemIndex = cartList.findIndex((cartItem) => cartItem.product.id === product.id);

  const [quantity, setQuantity] = useState<number>(
    existItemIndex !== -1 ? cartList[existItemIndex].quantity : 0,
  );

  const updateCartList = () => {
    const newCartItem: CartItem = {
      quantity,
      product,
    };

    if (existItemIndex !== -1) {
      const newCartList = cartList.slice();
      newCartList.splice(existItemIndex, 1, newCartItem);
      setCartList(newCartList);
      return;
    }

    setCartList([...cartList, newCartItem]);
  };

  const deleteCartItem = () => {
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
            setQuantity={(value) => setQuantity(value)}
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
