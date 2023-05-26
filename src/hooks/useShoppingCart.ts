import { addCartProducts, removeCartProduct, updateCartProductsQuantity } from 'apis/cart';
import { useRecoilState } from 'recoil';
import { cartProductsState } from 'state/cartProducts';
import { CheckedCartProducts, Product } from 'types/product';

const useShoppingCart = () => {
  const [cartProducts, setCartProducts] = useRecoilState(cartProductsState);

  const initialAddCart = async (product: Product) => {
    try {
      await addCartProducts(product.id);
    } catch (error) {
      console.error(error);
      alert('상품을 추가하지 못했어요. 다시 시도해주세요');
      return;
    }

    setCartProducts((prev) => {
      const newCartProducts = new Map(prev.entries());

      return newCartProducts.set(product.id, { quantity: 1, product });
    });
  };

  const decreaseQuantity = async (id: Product['id']) => {
    const targetCartProduct = cartProducts.get(id);
    if (!targetCartProduct) return;

    const prevQuantity = targetCartProduct.quantity;

    if (prevQuantity === 1) {
      await deleteCartProduct(id);
      return;
    }

    try {
      await updateCartProductsQuantity(prevQuantity - 1, id);
    } catch (error) {
      console.error(error);
      alert('수량을 변경하지 못했어요. 다시 시도해주세요');
      return;
    }

    setCartProducts((prev) => {
      const newCartProducts = new Map(prev.entries());

      return newCartProducts.set(id, { quantity: prevQuantity - 1, product: targetCartProduct.product });
    });
  };

  const increaseQuantity = async (id: Product['id']) => {
    const targetCartProduct = cartProducts.get(id);
    if (!targetCartProduct) return;

    const prevQuantity = targetCartProduct.quantity;

    try {
      await updateCartProductsQuantity(prevQuantity + 1, id);
    } catch (error) {
      console.error(error);
      alert('수량을 변경하지 못했어요. 다시 시도해주세요');
      return;
    }

    setCartProducts((prev) => {
      const newCartProducts = new Map(prev.entries());

      return newCartProducts.set(id, { quantity: prevQuantity + 1, product: targetCartProduct.product });
    });
  };

  const deleteCartProduct = async (id: Product['id']) => {
    const targetCartProduct = cartProducts.get(id);
    if (!targetCartProduct) return;

    try {
      await removeCartProduct(id);
    } catch (error) {
      console.error(error);
      alert('상품을 삭제하지 못했어요. 다시 시도해주세요');
      return;
    }

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
