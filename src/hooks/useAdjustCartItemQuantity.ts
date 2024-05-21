import { useRecoilState } from 'recoil';
import { cartItemQuantityState } from '../recoil/cartItems';
import { adjustCartItemQuantity } from '../api/shoppingCart';

const useAdjustCartItemQuantity = (id: number) => {
  const [cartItemQuantity, setCartItemQuantity] = useRecoilState(
    cartItemQuantityState(id),
  );

  const handleAdjustCartItemQuantity = async (
    cartItemId: number,
    updateQuantity: number,
  ) => {
    try {
      await adjustCartItemQuantity(cartItemId, updateQuantity);
      setCartItemQuantity(updateQuantity);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const minusCartItemQuantity = () => {
    if (cartItemQuantity === 1) {
      alert('수량은 1개 이상이어야 합니다!');
      return;
    }
    const updatedItemQuantity = cartItemQuantity - 1;
    handleAdjustCartItemQuantity(id, updatedItemQuantity);
  };

  const plusCartItemQuantity = () => {
    const updatedItemQuantity = cartItemQuantity + 1;
    handleAdjustCartItemQuantity(id, updatedItemQuantity);
  };

  return { minusCartItemQuantity, plusCartItemQuantity, cartItemQuantity };
};

export default useAdjustCartItemQuantity;
