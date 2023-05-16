import { useRecoilState } from 'recoil';
import { cartState } from 'state/CartAtom';
import { Product } from 'types/product';

export const useCartProduct = (product: Product) => {
  const [cart, setCart] = useRecoilState(cartState);

  const { id } = product;

  const addCartProduct = () => {
    const createCartProductFirst = () => {
      setCart((prev) => [...prev, { id, quantity: 1, product }]);
    };

    createCartProductFirst();
  };

  const isProductInCart = cart.some((cartProduct) => cartProduct.id === product.id);

  const decreaseQuantity = () => {
    if (!isProductInCart) {
      console.error('장바구니에 상품이 없어요! 먼저 상품을 등록해주세요.');
      return;
    }

    const decreased = cart.map((product) => {
      if (product.id !== id) return product;
      return { ...product, quantity: product.quantity - 1 };
    });

    setCart(decreased);
  };

  const increaseQuantity = () => {
    if (!isProductInCart) {
      console.error('장바구니에 상품이 없어요! 먼저 상품을 등록해주세요.');
      return;
    }

    const increased = cart.map((product) => {
      if (product.id !== id) return product;
      return { ...product, quantity: product.quantity + 1 };
    });

    setCart(increased);
  };
  return { addCartProduct, decreaseQuantity, increaseQuantity };
};
