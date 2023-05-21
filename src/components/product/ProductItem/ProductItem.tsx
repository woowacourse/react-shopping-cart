import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import Counter from '../../common/Counter/Counter';
import Image from '../../common/Image/Image';
import SmallCartIcon from '../../../assets/icons/SmallCartIcon';
import { formatPrice } from '../../../utils/formatPrice';
import useCartService from '../../../hooks/useCartService';
import productQuantityInCart from '../../../globalState/selectors/productQuantityInCart';
import type { Product } from '../../../types/product';

const ProductItem = (product: Product) => {
  const { id: productId, name, price, imageSrc } = product;
  const { addCartItem, updateCartItemQuantity, deleteCartItem, getCartId } =
    useCartService();

  const quantityInCart = useRecoilValue(productQuantityInCart(productId));
  const [count, setCount] = useState(quantityInCart);
  const [isDisplayCounter, setIsDisplayCounter] = useState(!!quantityInCart);

  const updateCount = (quantity: number) => {
    setCount(quantity);

    if (quantity === 0) return;
    updateCartItemQuantity(getCartId(productId))(quantity);
  };

  const handleAddCartButtonClick = () => {
    addCartItem(product);
    setIsDisplayCounter(true);
    setCount(1);
  };

  const handleNoQuantityAction = (quantity: number) => {
    if (quantity !== 0) return;

    const cartId = getCartId(productId);
    deleteCartItem(cartId);
    setIsDisplayCounter(false);
  };

  return (
    <ItemContainer>
      <ProductImageWrapper>
        <Image src={imageSrc} alt={name} size="large" />
        <CartButtonWrapper>
          {isDisplayCounter ? (
            <Counter
              count={count}
              updateCount={updateCount}
              onClickedButton={handleNoQuantityAction}
              onBlurredInput={handleNoQuantityAction}
            />
          ) : (
            <CartButton
              type="button"
              aria-label="장바구니에 추가하기"
              onClick={handleAddCartButtonClick}
            >
              <SmallCartIcon />
            </CartButton>
          )}
        </CartButtonWrapper>
      </ProductImageWrapper>
      <Contents>
        <div>
          <Title>{name}</Title>
          <Price>{formatPrice(price)}</Price>
        </div>
      </Contents>
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 18px;
  width: 282px;
  height: 358px;
`;

const ProductImageWrapper = styled.div`
  position: relative;
`;

const CartButtonWrapper = styled.div`
  position: absolute;
  right: 8px;
  bottom: 8px;
`;

const Contents = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 0 12px;
`;

const Title = styled.p`
  font-size: 16px;
  font-weight: 400;
`;

const Price = styled.p`
  margin-top: 3px;
  font-size: 20px;
  font-weight: 400;
`;

const CartButton = styled.button`
  background: #fff;
  border: 1px solid #dddddd;

  padding: 7px;

  cursor: pointer;
`;

export default ProductItem;
