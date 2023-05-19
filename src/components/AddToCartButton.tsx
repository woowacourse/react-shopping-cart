import { AddToCartCount } from './AddToCartCount';
import { AddToCartButtonImage } from '../assets/image';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { cartState } from '../atoms/CartState';
import { CartProductList, Product } from '../types/productType';
import { useCartState } from './hooks/useCartState';

export const AddToCartButton = ({
  addToCartState,
  product,
  id,
}: {
  addToCartState: () => void;
  product: Product;
  id: number;
}) => {
  const cartProductState = useRecoilValue(cartState);

  const quantity = cartProductState.find(
    (item: CartProductList) => item.id === id
  )?.quantity;

  const { increaseCount, deleteCartItem } = useCartState(product);

  return (
    <>
      {quantity ? (
        <AddToCartCount
          quantity={quantity}
          increaseCount={increaseCount}
          decreaseCount={deleteCartItem}
        />
      ) : (
        <AddToCartButtonImageWrapper>
          <AddToCartButtonImage onClick={addToCartState} />
        </AddToCartButtonImageWrapper>
      )}
    </>
  );
};

const AddToCartButtonImageWrapper = styled.div`
  cursor: pointer;
`;
