import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { CartIcon } from '../../../assets';
import type { Product } from '../../../types/types';
import { Text } from '../../common/Text/Text';
import InputStepper from '../../common/InputStepper/InputStepper';
import getPriceFormat from '../../../utils/getPriceFormat';
import { useCart } from '../../../hooks/useCart';

const ProductItem = ({ product }: { product: Product }) => {
  const { data, addCartItemAPI, changeCartQuantityAPI, deleteCartItemAPI } = useCart();
  const cartItemData = data && data.find((cart) => cart.product.id === product.id);
  const cartId = cartItemData && cartItemData.id;

  const [quantity, setQuantity] = useState<number>(
    (data && data.find((data) => data.product.id === product.id)?.quantity) || 0,
  );

  useEffect(() => {
    const mutateCartItem = async () => {
      if (data) {
        const findData = data.find((data) => data.product.id === product.id);
        if (findData && findData.quantity !== quantity) {
          if (quantity > 0) {
            cartId && changeCartQuantityAPI(cartId, { quantity });
            return;
          }
          cartId && deleteCartItemAPI(cartId);
        }
        if (quantity > 0 && !findData) {
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
            {getPriceFormat(product.price)} 원
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
