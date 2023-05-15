import { useRecoilState } from 'recoil';
import { productsInCartState } from '../recoil/atoms';

export const useCart = (productId: number) => {
  const [productsInCart, setProductsInCart] = useRecoilState(productsInCartState);

  const getProductInCart = () => {
    return productsInCart.find((product) => product.id === productId);
  };

  const addToCart = () => {
    setProductsInCart((prev) => [
      ...prev,
      {
        id: productId,
        quantity: 1,
      },
    ]);
  };

  const deleteFromCart = () => {
    const curIndex = productsInCart.findIndex((product) => product.id === productId);
    const newProductsInCart = structuredClone(productsInCart);

    newProductsInCart.splice(curIndex, 1);
    setProductsInCart(newProductsInCart);
  };

  const updateProductQuantity = (quantity: number) => {
    if (quantity <= 0) {
      deleteFromCart();
      return;
    }

    setProductsInCart((prev) => {
      return prev.map((productInCart) => {
        if (productInCart.id === productId) return { ...productInCart, quantity: quantity };

        return productInCart;
      });
    });
  };

  return {
    productsInCart,
    getProductInCart,
    addToCart,
    deleteFromCart,
    updateProductQuantity,
  };
};
