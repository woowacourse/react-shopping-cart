import { useEffect, useState } from 'react';
import { ShoppingCartIcon } from '../../../assets/ShoppingCartIcon';
import { useCartRecoil } from '../../../hooks/recoil/useCartRecoil';
import { Counter } from '../../../layout/counter/Counter';
import { useCartFetch } from '../../../hooks/fetch/useCartFetch';

interface AddCartButtonProps {
  id: number;
}

export const AddCartButton = ({ id }: AddCartButtonProps) => {
  const {
    cartItems,
    addRecoilCartById,
    deleteRecoilCartById,
    patchRecoilCartItemQuantity,
  } = useCartRecoil();
  const { addCartItemById, deleteCartItemById, patchCartItemQuantity } =
    useCartFetch();

  const [count, setCount] = useState<number>(
    cartItems.find((cartItem) => cartItem.id === id)?.quantity ?? 1
  );

  useEffect(() => {
    if (!cartItems.some((cartItem) => cartItem.id === id)) return;

    if (count <= 0) {
      deleteRecoilCartById(id);
      deleteCartItemById(id);
      setCount(1);

      return;
    }

    patchRecoilCartItemQuantity(id, count);
    patchCartItemQuantity(id, count);
  }, [count]);

  return (
    <>
      {cartItems.some((cartItem) => cartItem.id === id) ? (
        <Counter count={count} setCount={setCount} />
      ) : (
        <ShoppingCartIcon
          handleClick={() => {
            addRecoilCartById(id);
            addCartItemById(id);
          }}
        />
      )}
    </>
  );
};
