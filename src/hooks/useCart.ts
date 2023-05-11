import { atom, useRecoilState } from 'recoil';
import * as T from '../types/ProductType';
import { fetchMock } from '../api/mockApi';

interface Cart {
  id: number;
  quantity: number;
  product: T.ProductItem;
}

const cartState = atom<Cart[]>({
  key: 'cartState',
  default: [],
});

function useCart() {
  const [cartList, setCartList] = useRecoilState(cartState);

  const loadCartList = async () => {
    // mock API 연결해주기
  };

  const getQuantityByProductId = (id: number) => {
    const targetCart = cartList.find((cart) => cart.id === id);
    return targetCart ? targetCart.quantity : 0;
  };

  const addCart = async (product: T.ProductItem) => {
    if (cartList.findIndex((c) => c.id === product.id) !== -1) {
      return;
    }
    setCartList([...cartList, { id: product.id, quantity: 1, product }]);
    await fetchMock();
  };

  const increaseCart = async (id: number) => {
    const increasedCartList = cartList.map((cart) => {
      if (cart.id === id) {
        return {
          ...cart,
          quantity: cart.quantity + 1,
        };
      } else {
        return cart;
      }
    });

    setCartList(increasedCartList);
    await fetchMock();
  };

  const removeCart = async (id: number) => {
    const removedCartList = cartList.filter((cart) => cart.id !== id);
    setCartList(removedCartList);
    await fetchMock();
  };

  const decreaseCart = async (id: number) => {
    const quantity = getQuantityByProductId(id);
    if (quantity === 1) {
      removeCart(id);
    } else {
      const decreasedCartList = cartList.map((cart) => {
        if (cart.id === id) {
          return {
            ...cart,
            quantity: cart.quantity - 1,
          };
        } else {
          return cart;
        }
      });
      setCartList(decreasedCartList);
      await fetchMock();
    }
  };

  const setCartQuantity = async (id: number, quantity: number) => {
    if (quantity === 0) {
      removeCart(id);
    } else {
      const changedCartList = cartList.map((cart) => {
        if (cart.id === id) {
          return {
            ...cart,
            quantity: quantity,
          };
        } else {
          return cart;
        }
      });

      setCartList(changedCartList);
      await fetchMock();
    }
  };

  return {
    cartList,
    getQuantityByProductId,
    loadCartList,
    addCart,
    increaseCart,
    decreaseCart,
    setCartQuantity,
  };
}
export default useCart;
