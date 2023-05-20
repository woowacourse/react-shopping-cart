import { cartAtom } from '@recoil/atoms/cartAtom';
import { checkBoxAtom } from '@recoil/atoms/checkBoxAtom';
import { checkBoxTotalIdtAtom } from '@recoil/atoms/checkBoxTotalIdtAtom';
import { CartInformation, ProductInformation } from '@type/types';
import { CART_LIST_LOCAL_KEY } from '@constants/common';
import useAtomLocalStorage from './useAtomLocalStorage';

const useControlCart = () => {
  const [cart, setCart] = useAtomLocalStorage<CartInformation[]>(
    cartAtom,
    CART_LIST_LOCAL_KEY
  );

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
  };

  const addProductToCart = ({
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
    setCart(updatedCart);
  };

  const removeProductFromCart = (id: number) => {
    const updatedCart = cart.filter((product) => id !== product.id);
    const updatedCheckBox = checkBox.filter((checkBoxId) => checkBoxId !== id);
    const updatedCheckBoxTotalId = checkBoxTotalId.filter((checkBoxId) => checkBoxId !== id);

    setCheckBox(updatedCheckBox);
    setCheckBoxTotalId(updatedCheckBoxTotalId);
    setCart(updatedCart);
  };

  return { addProductToCart, removeProductFromCart, updateQuantityOfCartItem };
};

export default useControlCart;
