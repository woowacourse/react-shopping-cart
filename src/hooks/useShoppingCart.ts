import { removeCartProduct } from 'apis/cart/delete';
import { updateCartProductsQuantity } from 'apis/cart/patch';
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

  const decreaseQuantity = async () => {
    if (!targetCartProduct) throw new Error('장바구니에 없는 상품의 수량은 조절할 수 없습니다.');
    const prevQuantity = targetCartProduct.quantity;

    // TODO: DELETE 구현 후 분기로직

    await updateCartProductsQuantity(prevQuantity - 1, id);

    setCartProducts((prev) => {
      const newCartProducts = new Map(prev.entries());

      return newCartProducts.set(id, { quantity: prevQuantity - 1, product });
    });
  };

  const increaseQuantity = async () => {
    if (!targetCartProduct) throw new Error('장바구니에 없는 상품의 수량은 조절할 수 없습니다.');
    const prevQuantity = targetCartProduct.quantity;

    await updateCartProductsQuantity(prevQuantity + 1, id);

    setCartProducts((prev) => {
      const newCartProducts = new Map(prev.entries());

      return newCartProducts.set(id, { quantity: prevQuantity + 1, product });
    });
  };

  const deleteCartProduct = async () => {
    if (!targetCartProduct) throw new Error('장바구니에 없는 상품의 수량은 조절할 수 없습니다.');

    await removeCartProduct(id);

    setCartProducts((prev) => {
      prev.delete(id);

      return new Map(prev.entries());
    });
  };

  return { cartProducts, initialAddCart, increaseQuantity, decreaseQuantity, deleteCartProduct };
};

export default useShoppingCart;
