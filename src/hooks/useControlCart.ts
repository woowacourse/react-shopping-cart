import { useSetRecoilState } from 'recoil';
import { cartAtom } from '@recoil/atoms/cartAtom';
import { checkBoxAtom } from '@recoil/atoms/checkBoxAtom';
import { CartInformation, ProductInformation } from '@type/types';
import fetchApi from '@utils/fetchApi';
import { CART_LIST_LOCAL_KEY, CART_URL } from '@constants/common';
import useAtomLocalStorage from './useAtomLocalStorage';

const useControlCart = () => {
  const [cart, setCart] = useAtomLocalStorage<CartInformation[]>(
    cartAtom,
    CART_LIST_LOCAL_KEY
  );

  const setData = useSetRecoilState(cartAtom);

  const [checkBox, setCheckBox] = useAtomLocalStorage<number[]>(
    checkBoxAtom,
    'checkBox'
  );

  const updateQuantityOfCartItem = (id: number, quantity: number) => {
    const updateCart = cart.map((product) => {
      return product.id === id ? { ...product, quantity } : product;
    });

    setCart(updateCart);
    setData(updateCart);
  };

  const addProductToCart = async ({
    name,
    id,
    price,
    imageUrl,
  }: ProductInformation) => {
    const product: CartInformation = {
      id,
      product: { name, price, imageUrl, id },
      quantity: 1,
    };

    const updatedCart = [...cart, product];

    setCheckBox([...checkBox, id]);

    await fetchApi(CART_URL, {
      method: 'post',
      headers: {
        Authorization: 'Basic YUBhLmNvbToxMjM0',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId: Number(id) }),
    });

    setData(updatedCart);
  };

  const removeProductFromCart = (id: number) => {
    const updatedCart = cart.filter((product) => id !== product.id);
    const updatedCheckBox = checkBox.filter((checkBoxId) => checkBoxId !== id);

    setCheckBox(updatedCheckBox);

    setCart(updatedCart);
    setData(updatedCart);
  };

  return { addProductToCart, removeProductFromCart, updateQuantityOfCartItem };
};

export default useControlCart;
