import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { CartIcon } from '../../../assets';
import type { CartItemType, ProductType } from '../../../types/types';
import { Text } from '../../common/Text/Text';
import InputStepper from '../../common/InputStepper/InputStepper';
import useCart from '../../../hooks/useCart';

const ProductItem = ({ product }: { product: ProductType }) => {
  const { cartData, addCartItemAPI, changeCartQuantityAPI, deleteCartItemAPI } = useCart();

  const [cartItemData, setCartItemData] = useState<CartItemType | null>(null);

  const [quantity, setQuantity] = useState<number>(cartItemData?.quantity ?? 0);

  useEffect(() => {
    if (cartData) {
      setCartItemData(cartData.find((cart) => cart.product.id === product.id) || null);
    }
  }, [cartData]);

  useEffect(() => {
    if (cartItemData) {
      setQuantity(cartItemData.quantity);
      return;
    }
  }, [cartItemData]);

  const changeQuantity = (value: number) => {
    if (cartItemData && value !== cartItemData.quantity) {
      if (value === 0) {
        deleteCartItemAPI(cartItemData.id, () => setQuantity(value));
        return;
      }

      changeCartQuantityAPI(cartItemData.id, { quantity: value }, () => setQuantity(value));
      return;
    }
    addCartItemAPI({ productId: product.id }, () => setQuantity(value));
  };

  return (
    <ProductWrapper>
      <ProductImage src={product.imageUrl} alt={product.name} />
      <ProductInfoWrapper>
        <ProductTextWrapper>
          <Text size="smaller" weight="light" color="#333333">
            {product.name}
          </Text>
          <Text size="small" weight="light" color="#333333" lineHeight="33px">
            {product.price.toLocaleString()} 원
          </Text>
        </ProductTextWrapper>
        {quantity === 0 ? (
          <CartIcon
            width={25}
            height={22}
            fill="#AAAAAA"
            style={{ transform: 'scaleX(-1)', cursor: 'pointer' }}
            onClick={() => changeQuantity(1)}
          />
        ) : (
          <InputStepper size="small" quantity={quantity} setQuantity={changeQuantity} />
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
  transition: all 0.32s ease;

  &:hover {
    transform: translateY(-10px) scale(1.05);
    box-shadow: 1px 14px 24px hsla(218, 53%, 10%, 12%);
  }
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
