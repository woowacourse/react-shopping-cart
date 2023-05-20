import { api } from 'apis/products/api';
import { useRecoilState } from 'recoil';
import { cartState } from 'state/CartAtom';
import { Product } from 'types/product';

export const useCartProduct = (product: Product) => {
  const [cart, setCart] = useRecoilState(cartState);

  const { id } = product;

  const addCartProduct = () => {
    const createCartProductFirst = () => {
      setCart((prev) => [...prev, { id, quantity: 1, checked: true, product }]);
      api.createCartProduct(product.id);
    };

    createCartProductFirst();
  };

  const deleteCartProduct = () => {
    const cartProduct = cart.find((cartProduct) => cartProduct.id === product.id);

    if (!cartProduct) {
      console.error('장바구니에 상품이 없어요! 먼저 상품을 등록해주세요.');
      return;
    }

    const newCart = cart.filter((product) => product.id !== id);

    setCart(newCart);

    api.deleteCartProduct(cartProduct.id);
  };

  const decreaseQuantity = () => {
    const cartProduct = cart.find((cartProduct) => cartProduct.id === product.id);

    if (!cartProduct) {
      console.error('장바구니에 상품이 없어요! 먼저 상품을 등록해주세요.');
      return;
    }

    const updatedCartProduct = { ...cartProduct, quantity: cartProduct.quantity - 1 };

    if (cartProduct.quantity > 1) {
      const decreased = cart.map((product) => {
        if (product.id !== id) return product;
        return updatedCartProduct;
      });

      setCart(decreased);

      api.updateCartProduct(updatedCartProduct);
    } else {
      deleteCartProduct();
    }
  };

  const increaseQuantity = () => {
    const cartProduct = cart.find((cartProduct) => cartProduct.id === product.id);

    if (!cartProduct) {
      console.error('장바구니에 상품이 없어요! 먼저 상품을 등록해주세요.');
      return;
    }

    const updatedCartProduct = { ...cartProduct, quantity: cartProduct.quantity + 1 };

    const increased = cart.map((product) => {
      if (product.id !== id) return product;
      return updatedCartProduct;
    });

    setCart(increased);

    api.updateCartProduct(updatedCartProduct);
  };

  const toggleChecked = () => {
    const cartProduct = cart.find((cartProduct) => cartProduct.id === product.id);

    if (!cartProduct) {
      console.error('장바구니에 상품이 없어요! 먼저 상품을 등록해주세요.');
      return;
    }

    const updatedCartProduct = { ...cartProduct, checked: !cartProduct.checked };

    const toggled = cart.map((product) => {
      if (product.id !== id) return product;
      return updatedCartProduct;
    });

    setCart(toggled);

    api.updateCartProduct(updatedCartProduct);
  };

  return { addCartProduct, deleteCartProduct, decreaseQuantity, increaseQuantity, toggleChecked };
};
