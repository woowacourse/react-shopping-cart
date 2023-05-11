import { useRecoilState } from 'recoil';
import { productsInCartState } from '../atom';

export const useCart = () => {
  const [productsInCart, setProductsInCart] = useRecoilState(productsInCartState);

  const addToCart = (productId: number) => {
    setProductsInCart((prev) => [
      ...prev,
      {
        id: productId,
        quantity: 1,
      },
    ]);
  };

  const findProductInCart = (productId: number) => {
    return productsInCart.find((product) => product.id === productId);
  };

  const isSelected = (productId: number) => {
    return Boolean(findProductInCart(productId));
  };

  const increaseProductQuantity = (productId: number) => {
    setProductsInCart((prev) => {
      return prev.map((productInCart) => {
        if (productInCart.id === productId)
          return { ...productInCart, quantity: productInCart.quantity + 1 };

        return productInCart;
      });
    });
  };

  const decreaseProductQuantity = (productId: number) => {
    setProductsInCart((prev) => {
      return prev.map((productInCart) => {
        if (productInCart.id === productId)
          return { ...productInCart, quantity: productInCart.quantity - 1 };

        return productInCart;
      });
    });
  };

  const updateProductQuantity = (productId: number, quantity: number) => {
    setProductsInCart((prev) => {
      return prev.map((productInCart) => {
        if (productInCart.id === productId) return { ...productInCart, quantity: quantity };

        return productInCart;
      });
    });
  };

  return {
    productsInCart,
    findProductInCart,
    addToCart,
    isSelected,
    increaseProductQuantity,
    decreaseProductQuantity,
    updateProductQuantity,
  };
};
