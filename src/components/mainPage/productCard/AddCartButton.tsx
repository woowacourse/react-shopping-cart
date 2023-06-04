import { useState } from 'react';
import { ShoppingCartIcon } from '../../../assets/ShoppingCartIcon';
import { useCartRecoil } from '../../../hooks/recoil/useCartRecoil';
import { Counter } from '../../common/counter/Counter';
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
    deleteCartItemById(id).catch(() => {
      alert(
        '장바구니에서 상품을 제거하는 도중 오류가 발생했습니다! 새로고침 후 다시 시도해주세요!!'
      );
      window.location.reload();
    });
  };

  const patchQuantity = (quantity: number, prevQuantity: number) => {
    patchRecoilCartItemQuantity(id, quantity);
    patchCartItemQuantity(id, quantity).catch(() => {
      setQuantity(prevQuantity);
      alert(
        '상품 수량 변경중 오류가 발생했습니다! 새로고침 후 다시 시도해주세요!!'
      );
    });
  };

  const handleQuantityChange = (quantity: number, prevQuantity: number) => {
    if (quantity <= 0) {
      deleteCartItem();
      setQuantity(1);
      return;
    }

    setQuantity(quantity);
    patchQuantity(quantity, prevQuantity);
  };

  return (
    <>
      {getIsCartIncludes(id) ? (
        <Counter
          quantity={quantity}
          handleQuantityChange={handleQuantityChange}
        />
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
