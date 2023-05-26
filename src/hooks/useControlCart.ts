import { useSetRecoilState } from 'recoil';
import { cartAtom } from '@recoil/atoms/cartAtom';
import { checkBoxAtom } from '@recoil/atoms/checkBoxAtom';
import { checkBoxTotalIdtAtom } from '@recoil/atoms/checkBoxTotalIdtAtom';
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

  const [checkBoxTotalId, setCheckBoxTotalId] = useAtomLocalStorage<number[]>(
    checkBoxTotalIdtAtom,
    'checkBoxTotalId'
  );

  const updateQuantityOfCartItem = (id: number, quantity: number) => {
    const updateCart = cart.map((product) => {
      if (product.id === id) {
        return { ...product, quantity };
      }
      return product;
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
    setCheckBoxTotalId([...checkBox, id]);


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
    const updatedCheckBoxTotalId = checkBoxTotalId.filter(
      (checkBoxId) => checkBoxId !== id
    );

    setCheckBox(updatedCheckBox);
    setCheckBoxTotalId(updatedCheckBoxTotalId);

    setCart(updatedCart);
    setData(updatedCart);
  };

  return { addProductToCart, removeProductFromCart, updateQuantityOfCartItem };
};

export default useControlCart;
