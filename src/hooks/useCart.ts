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

  const loadCart = async () => {
    await fetchMock();
    //...

    return cartList;
  };

  const getQuantityByProductId = (id: number) => {
    const targetCart = cartList.find((cart) => cart.id === id);
    return targetCart ? targetCart.quantity : 0;
  };

  const addCart = async (product: T.ProductItem) => {
    await fetchMock();
    if (cartList.findIndex((c) => c.id === product.id) !== -1) {
      return;
    }
    console.log('aasd');
    setCartList([...cartList, { id: product.id, quantity: 1, product }]);
  };

  const increaseCart = async () => {
    await fetchMock();
  };

  const decreaseCart = async () => {
    await fetchMock();
  };

  return {
    cartList,
    getQuantityByProductId,
    addCart,
  };
}
export default useCart;
