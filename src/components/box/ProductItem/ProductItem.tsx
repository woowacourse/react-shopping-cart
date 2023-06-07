import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { CartIcon } from '../../../assets';
import type { CartItemType, ProductType } from '../../../types/types';
import { Text } from '../../common/Text/Text';
import InputStepper from '../../common/InputStepper/InputStepper';
import { useCart } from '../../../hooks/useCart';

const ProductItem = ({ product }: { product: ProductType }) => {
  const { cartData, addCartItemAPI, changeCartQuantityAPI, deleteCartItemAPI } = useCart();

  const [cartItemData, setCartItemData] = useState<CartItemType | null>(null);

  const [quantity, setQuantity] = useState<number>(0);

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
    setQuantity(0);
  }, [cartItemData]);

  useEffect(() => {
    const mutateCartItem = async () => {
      if (cartData) {
        if (cartItemData && cartItemData.quantity !== quantity) {
          if (quantity > 0) {
            cartItemData.id && changeCartQuantityAPI(cartItemData.id, { quantity });
            return;
          }
          cartItemData.id && deleteCartItemAPI(cartItemData.id);
        }
        if (quantity > 0 && !cartItemData) {
          addCartItemAPI({ productId: product.id });
        }
      }
    };
    mutateCartItem();
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
            {product.price.toLocaleString()} 원
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
