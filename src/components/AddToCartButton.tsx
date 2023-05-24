import { AddToCartCount } from './AddToCartCount';
import { AddToCartButtonImage } from '../assets/image';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { cartState } from '../atoms/CartState';
import { Cart, Product } from '../types';
import { useCartState } from '../hooks/useCartState';

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
    (item: Cart) => item.id === id
  )?.quantity;

  const { increaseCount, decreaseCount } = useCartState(product);

  const handleIncreaseCount = () => {
    increaseCount();
  };
  const handleDecreaseCount = () => {
    decreaseCount();
  };

  return (
    <>
      {quantity ? (
        <AddToCartCount
          quantity={quantity}
          increaseCount={handleIncreaseCount}
          decreaseCount={handleDecreaseCount}
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
