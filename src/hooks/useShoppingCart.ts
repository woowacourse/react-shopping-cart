import { removeCartProduct } from 'apis/cart/delete';
import { updateCartProductsQuantity } from 'apis/cart/patch';
import { addCartProducts } from 'apis/cart/post';
import { useRecoilState } from 'recoil';
import { cartProductsState } from 'state/cartProducts';
import { CheckedCartProducts, Product } from 'types/product';

const useShoppingCart = () => {
  const [cartProducts, setCartProducts] = useRecoilState(cartProductsState);

  const initialAddCart = async (product: Product) => {
    await addCartProducts(product.id);

    setCartProducts((prev) => {
      const newCartProducts = new Map(prev.entries());

      return newCartProducts.set(product.id, { quantity: 1, product });
    });
  };

  const decreaseQuantity = async (id: Product['id']) => {
    const targetCartProduct = cartProducts.get(id);
    if (!targetCartProduct) throw new Error('장바구니에 없는 상품의 수량은 조절할 수 없습니다.');

    const prevQuantity = targetCartProduct.quantity;

    if (prevQuantity === 1) {
      await deleteCartProduct(id);
      return;
    }

    await updateCartProductsQuantity(prevQuantity - 1, id);

    setCartProducts((prev) => {
      const newCartProducts = new Map(prev.entries());

      return newCartProducts.set(id, { quantity: prevQuantity - 1, product: targetCartProduct.product });
    });
  };

  const increaseQuantity = async (id: Product['id']) => {
    const targetCartProduct = cartProducts.get(id);
    if (!targetCartProduct) throw new Error('장바구니에 없는 상품의 수량은 조절할 수 없습니다.');

    const prevQuantity = targetCartProduct.quantity;

    await updateCartProductsQuantity(prevQuantity + 1, id);

    setCartProducts((prev) => {
      const newCartProducts = new Map(prev.entries());

      return newCartProducts.set(id, { quantity: prevQuantity + 1, product: targetCartProduct.product });
    });
  };

  const deleteCartProduct = async (id: Product['id']) => {
    const targetCartProduct = cartProducts.get(id);
    if (!targetCartProduct) throw new Error('장바구니에 없는 상품의 수량은 조절할 수 없습니다.');

    await removeCartProduct(id);

    setCartProducts((prev) => {
      prev.delete(id);

      return new Map(prev.entries());
    });
  };

  const deleteCheckedCartProducts = (checkedCartProducts: CheckedCartProducts) => {
    [...checkedCartProducts].forEach(async (id) => await deleteCartProduct(id));
  };

  return {
    cartProducts,
    initialAddCart,
    increaseQuantity,
    decreaseQuantity,
    deleteCartProduct,
    deleteCheckedCartProducts,
  };
};

export default useShoppingCart;
