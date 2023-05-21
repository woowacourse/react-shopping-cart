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
    addRecoilCartById,
    deleteRecoilCartById,
    patchRecoilCartItemQuantity,
    getProductQuantityById,
    getIsCartIncludes,
  } = useCartRecoil();
  const { addCartItemById, deleteCartItemById, patchCartItemQuantity } =
    useCartFetch();

  const [quantity, setQuantity] = useState<number>(
    getProductQuantityById(id) ?? 1
  );

  const deleteCartItem = () => {
    deleteRecoilCartById(id);
    deleteCartItemById(id);
  };

  const patchQuantity = () => {
    patchRecoilCartItemQuantity(id, quantity);
    patchCartItemQuantity(id, quantity);
  };

  useEffect(() => {
    if (!getIsCartIncludes(id)) return;

    if (quantity <= 0) {
      deleteCartItem();
      setQuantity(1);
      return;
    }

    patchQuantity();
  }, [quantity]);

  return (
    <>
      {getIsCartIncludes(id) ? (
        <Counter count={quantity} setCount={setQuantity} />
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
