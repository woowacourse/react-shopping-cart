import { AddToCartCount } from './AddToCartCount';
import { AddToCartButtonImage } from '../assets/image';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { cartState } from '../atoms/CartState';
import { CartProductList } from '../types/productType';

export const AddToCartButton = ({
  addToCartState,
  id,
}: {
  addToCartState: () => void;
  id: number;
}) => {
  const cartProductState = useRecoilValue(cartState);

  const quantity = cartProductState.find(
    (item: CartProductList) => item.id === id
  )?.quantity;

  return (
    <>
      {quantity ? (
        <AddToCartCount id={id} quantity={quantity} />
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
