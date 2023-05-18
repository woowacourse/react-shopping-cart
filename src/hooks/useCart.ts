import { useRecoilState } from 'recoil';
import { cartListState } from '../recoil/atoms';
import { ProductInfo } from '../types';

export const useCart = (productInfo?: ProductInfo) => {
  const [cartList, setCartList] = useRecoilState(cartListState);

  const getCartItem = () => {
    return cartList.find((cartItem) => cartItem.id === productInfo?.id);
  };

  const addToCart = () => {
    if (!productInfo) return;

    setCartList((prev) => [
      ...prev,
      {
        id: productInfo.id,
        quantity: 1,
        product: productInfo,
      },
    ]);
  };

  const deleteFromCart = (productId?: number) => {
    const curProductId = productId ? productId : productInfo?.id;
    setCartList((cartList) => cartList.filter((cartItem) => cartItem.id !== curProductId));
  };

  const updateProductQuantity = (quantity: number) => {
    if (quantity <= 0) {
      deleteFromCart();
      return;
    }

    setCartList((prev) => {
      return prev.map((cartItem) => {
        if (cartItem.id === productInfo?.id) return { ...cartItem, quantity: quantity };

        return cartItem;
      });
    });
  };

  return {
    cartList,
    setCartList,
    getCartItem,
    addToCart,
    deleteFromCart,
    updateProductQuantity,
  };
};
