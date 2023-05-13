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

  const throwErrorIfProductNotInCart = () => {
    if (!isProductInCart) {
      throw new Error('장바구니에 상품이 없어요. 장바구니에 상품을 추가해주세요!');
    }
  };

  const decreaseQuantity = () => {
    throwErrorIfProductNotInCart();

    const decreased = cart.map((product) => {
      if (product.id !== id) return product;
      return { ...product, quantity: product.quantity - 1 };
    });

    setCart(decreased);
  };

  const increaseQuantity = () => {
    throwErrorIfProductNotInCart();

    const increased = cart.map((product) => {
      if (product.id !== id) return product;
      return { ...product, quantity: product.quantity + 1 };
    });

    setCart(increased);
  };
  return { addCartProduct, decreaseQuantity, increaseQuantity };
};
