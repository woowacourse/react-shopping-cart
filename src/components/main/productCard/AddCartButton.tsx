import { ShoppingCartIcon } from '../../../assets/ShoppingCartIcon';
import { useCartIdList } from '../../../hooks/recoil/useCartIdList';
import { useCounterInput } from '../../../hooks/useCounterInput';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { Counter } from './Counter';

interface AddCartButtonProps {
  id: number;
}

export const AddCartButton = ({ id }: AddCartButtonProps) => {
  const { cartIdList, addProductToCartIdList, removeProductFromCartIdList } =
    useCartIdList();

  const { getProductQuantityById, patchProductQuantity } = useLocalStorage();

  const { inputRef, handleDecrease, handleIncrease } = useCounterInput({
    minLimit: 0,
    handleMinLimitExceeded: () => removeProductFromCartIdList(id),
    increaseCallback: () =>
      patchProductQuantity(id, Number(inputRef.current?.value)),
    decreaseCallback: () =>
      patchProductQuantity(id, Number(inputRef.current?.value)),
  });

  return (
    <>
      {cartIdList.includes(id) ? (
        <Counter
          ref={inputRef}
          handleIncrease={handleIncrease}
          handleDecrease={handleDecrease}
          initialValue={getProductQuantityById(id)}
        />
      ) : (
        <ShoppingCartIcon handleClick={() => addProductToCartIdList(id)} />
      )}
    </>
  );
};
