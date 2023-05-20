import { addCartProducts } from 'apis/cart/post';
import { useRecoilState } from 'recoil';
import { cartProductsState } from 'state/cartProducts';
import { Product } from 'types/product';

const useShoppingCart = (product: Product) => {
  const [cartProducts, setCartProducts] = useRecoilState(cartProductsState);
  const { id } = product;
  const targetCartProduct = cartProducts.get(id);

  const initialAddCart = async () => {
    await addCartProducts(id);

    setCartProducts((prev) => {
      const newCartProducts = new Map(prev.entries());

      return newCartProducts.set(id, { quantity: 1, product });
    });
  };

  const decreaseQuantity = () => {
    if (!targetCartProduct) throw new Error('장바구니에 없는 상품의 수량은 조절할 수 없습니다.');

    setCartProducts((prev) => {
      const newCartProducts = new Map(prev.entries());
      const prevQuantity = targetCartProduct.quantity;

      return newCartProducts.set(id, { quantity: prevQuantity - 1, product });
    });
  };

  const increaseQuantity = () => {
    if (!targetCartProduct) throw new Error('장바구니에 없는 상품의 수량은 조절할 수 없습니다.');

    setCartProducts((prev) => {
      const newCartProducts = new Map(prev.entries());
      const prevQuantity = targetCartProduct.quantity;

      return newCartProducts.set(id, { quantity: prevQuantity + 1, product });
    });
  };

  const deleteCartProduct = () => {
    if (!targetCartProduct) throw new Error('장바구니에 없는 상품의 수량은 조절할 수 없습니다.');

    setCartProducts((prev) => {
      prev.delete(id);

      return new Map(prev.entries());
    });
  };

  return { cartProducts, initialAddCart, increaseQuantity, decreaseQuantity, deleteCartProduct };
};

export default useShoppingCart;
