import { useRecoilState } from 'recoil';
import { checkboxesState } from '../../atoms/CheckboxState';
import { CartProductItem } from '../../types/productType';
import { asyncForEach } from '../../utils/asyncForEach';
import { deleteCartItem, getRequest } from '../../api';
import { cartState } from '../../atoms/CartListState';
import { useEffect } from 'react';
import { ERROR_MESSAGE } from '../../constants';

export const useCheckboxes = () => {
  const [cartLists, setCartList] = useRecoilState(cartState);
  const [checkboxes, setCheckboxes] = useRecoilState(checkboxesState);

  const handleCheckboxes = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked
      ? setCheckboxes(
          cartLists.map((cartItem) => ({
            id: cartItem.id,
            price: cartItem.product.price,
            quantity: cartItem.quantity,
          }))
        )
      : setCheckboxes([]);
  };

  const handleDeleteChecked = async () => {
    const checkboxesIds = checkboxes.map((checkbox) => checkbox.id);

    try {
      await asyncForEach(checkboxesIds, async (id: number) => {
        await deleteCartItem(id);
      });

      setCartList((prevCartList) =>
        prevCartList.filter((cartItem) => !checkboxesIds.includes(cartItem.id))
      );

      setCheckboxes([]);
    } catch {
      alert(ERROR_MESSAGE.deleteCartItem);
    }
  };

  useEffect(() => {
    const initProductListFromApi = async () => {
      const cartList = await getRequest<CartProductItem[]>('carts');

      setCartList(cartList);
    };

    initProductListFromApi();

    setCheckboxes(
      cartLists.map((cartItem) => ({
        id: cartItem.id,
        price: cartItem.product.price,
        quantity: cartItem.quantity,
      }))
    );
  }, []);

  return { checkboxes, cartLists, handleCheckboxes, handleDeleteChecked };
};
