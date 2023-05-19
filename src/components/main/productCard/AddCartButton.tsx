import { useEffect, useState } from 'react';
import { ShoppingCartIcon } from '../../../assets/ShoppingCartIcon';
import { useCartProductList } from '../../../hooks/recoil/useCartProductList';
import { useCounterInput } from '../../../hooks/useCounterInput';
import { Counter } from './Counter';

interface AddCartButtonProps {
  id: number;
}

export const AddCartButton = ({ id }: AddCartButtonProps) => {
  const {
    cartIdList,
    addProductIdToCartIdList,
    removeProductFromCartProductList,
  } = useCartProductList();

  const { inputRef, handleDecrease, handleIncrease } = useCounterInput({
    minLimit: 0,
    handleMinLimitExceeded: () => removeProductFromCartProductList(id),
    increaseCallback: () => {
      const quantity = Number(inputRef.current?.value);

      fetch(`/cart-items/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          quantity: quantity,
        }),
      });
    },
    decreaseCallback: () => {
      const quantity = Number(inputRef.current?.value);

      fetch(`/cart-items/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          quantity: quantity,
        }),
      });
    },
  });

  const [initialValue, setInitialValue] = useState(1);

  useEffect(() => {
    fetch(`/cart-items/quantity/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setInitialValue(Number(data));
      });
  }, [cartIdList]);

  return (
    <>
      {cartIdList.some((cartItemId) => cartItemId === id) ? (
        <Counter
          ref={inputRef}
          handleIncrease={handleIncrease}
          handleDecrease={handleDecrease}
          initialValue={initialValue}
        />
      ) : (
        <ShoppingCartIcon handleClick={() => addProductIdToCartIdList(id)} />
      )}
    </>
  );
};
