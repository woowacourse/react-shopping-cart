import { cartAtom } from '@recoil/atoms/cartAtom';
import { CartInformation, ProductInformation } from '@type/types';
import {
  createCartItem,
  removedItemCart,
  changedQuantityCart,
  toggleSelectCartItem,
  calculateSelectCartTotalPrice,
  removeSelectedCartItem,
  cartItemSelectedById,
  allSelectCartItem,
} from '@utils/cart';
import { CART_LIST_LOCAL_KEY } from '@constants/common';
import useAtomLocalStorage from './useAtomLocalStorage';
import useCartList from './useCartList';

const useControlCart = () => {
  const { updateCartItem, addItemToCart, removeItemFromCart } = useCartList();
  const [cart, setCart] = useAtomLocalStorage<CartInformation[]>(
    cartAtom,
    CART_LIST_LOCAL_KEY
  );

  const updateQuantityOfCartItem = (id: number, quantity: number) => {
    const updatedCart = changedQuantityCart({ quantity, id, cart });

    updateCartItem({ cartItemId: id, quantity });
    setCart(updatedCart);
  };

  const addProductToCart = ({
    name,
    id,
    price,
    imageUrl,
  }: ProductInformation) => {
    const cartItem = createCartItem({ id, name, price, imageUrl });

    addItemToCart({ productId: id });
    setCart([...cart, cartItem]);
  };

  const removeProductFromCart = (id: number) => {
    const updatedCart = removedItemCart(cart, id);

    removeItemFromCart({ cartItemId: id });
    setCart(updatedCart);
  };

  const toggleSelectItem = (id: number) => {
    const updatedCart = toggleSelectCartItem(cart, id);

    setCart(updatedCart);
  };

  const getSelectCartTotalPrice = () => {
    return calculateSelectCartTotalPrice(cart);
  };

  const removeSelectCartItem = () => {
    const result = window.confirm('선택한 장바구니 아이템을 삭제하시겠습니까?');
    if (result) {
      const updatedCart = removeSelectedCartItem(cart);
      const selectedItemId = cartItemSelectedById(cart);

      selectedItemId.forEach((cartItemId) =>
        removeItemFromCart({ cartItemId })
      );

      setCart(updatedCart);
    }
  };

  const allSelectCartList = (isCheck: boolean) => {
    const updatedCart = allSelectCartItem(cart, isCheck);

    setCart(updatedCart);
  };

  const clearCartItems = () => {
    alert('주문이 완료되었습니다.');

    cart
      .map((cartItem) => cartItem.id)
      .forEach((cartItemId) => removeItemFromCart({ cartItemId }));

    setCart([]);
  };

  return {
    cart,
    addProductToCart,
    removeProductFromCart,
    updateQuantityOfCartItem,
    toggleSelectItem,
    getSelectCartTotalPrice,
    removeSelectCartItem,
    allSelectCartList,
    clearCartItems,
  };
};

export default useControlCart;
