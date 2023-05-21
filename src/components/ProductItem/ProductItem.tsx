import * as Styled from './ProductItem.styles.tsx';
import ShoppingCartLogo from '../@common/ShoppingCartLogo/ShoppingCartLogo';
import { Item } from '../../types/CartList.ts';
import StepperInput from '../@common/StepperInput/StepperInput.tsx';
import { useEffect } from 'react';
import useCart from '../../hooks/useCart.ts';
import usePostUpdateCart from '../../hooks/requests/usePostUpdateCart.ts';

export type ProductItemProps = {
  cartItem?: Item;
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

const ProductItem = ({ cartItem: cartItemProp, id, name, price, imageUrl }: ProductItemProps) => {
  const { updateCart } = useCart();
  const { data: cartItem, optimisticUpdate } = usePostUpdateCart(cartItemProp);

  const handleAddToCartButton = () => {
    const updatedCartItem = { id, quantity: 1, isSelected: true, itemInfo: { id, name, imageUrl, price } };
    optimisticUpdate(updatedCartItem, { itemId: id, quantity: 1 });
  };

  const handleStepperInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (cartItem) {
      const targetQuantity = parseInt(e.target.value, 10);
      const updatedCartItem = { ...cartItem, quantity: targetQuantity };
      optimisticUpdate(updatedCartItem, { itemId: id, quantity: targetQuantity });
    }
  };

  useEffect(() => {
    if (cartItem && cartItem !== cartItemProp) {
      updateCart(cartItem);
    }
  }, [cartItem, cartItemProp]);

  const CartButton = () => {
    return (
      <Styled.CartButton onClick={handleAddToCartButton}>
        <ShoppingCartLogo isFlipped={true} width={24} height={22} fill='#AAAAAA' />
      </Styled.CartButton>
    );
  };

  return (
    <Styled.ProductItemWrapper data-cy='productItem'>
      <Styled.ImageOverflowContainer>
        <Styled.ImageContainer>
          <Styled.ProductItemImage src={imageUrl} />
        </Styled.ImageContainer>
      </Styled.ImageOverflowContainer>
      <Styled.ProductItemInfo>
        <Styled.ProductItemInfoUpperBoundary>
          <Styled.ProductItemTitle>{name}</Styled.ProductItemTitle>
          {cartItem?.quantity ? <StepperInput value={cartItem?.quantity || 0} onChange={handleStepperInputChange} /> : <CartButton />}
        </Styled.ProductItemInfoUpperBoundary>
        <Styled.ProductItemPrice>{price.toLocaleString()}원</Styled.ProductItemPrice>
      </Styled.ProductItemInfo>
    </Styled.ProductItemWrapper>
  );
};

export default ProductItem;
