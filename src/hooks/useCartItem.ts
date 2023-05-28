import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { cartAtom } from '@recoil/atoms/cartAtom';
import { checkBoxAtom } from '@recoil/atoms/checkBoxAtom';
import fetchApi from '@utils/fetchApi';
import { CART_URL } from '@constants/common';
import useAtomLocalStorage from './useAtomLocalStorage';

const useCartItem = (id: number) => {
  const [value, setData] = useRecoilState(cartAtom);

  const [checkBox, setCheckBox] = useAtomLocalStorage<number[]>(
    checkBoxAtom,
    'checkBox'
  );

  const [check, setCheck] = useState(false);

  const checkBoxOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheckBox([...checkBox, id]);
      return;
    }

    const newCheckBox = checkBox.filter((checkBoxId) => checkBoxId !== id);
    setCheckBox(newCheckBox);
  };

  const deleteItem = async () => {
    const updatedId: number[] = [];

    value.forEach((product) => {
      if (product.id !== id) updatedId.push(product.id);
    });

    const updatedCart = value.filter((product) =>
      checkBox.includes(product.id)
    );

    setCheckBox(updatedId);
    setData(updatedCart);

    await fetchApi(`${CART_URL}/${id}`, {
      method: 'delete',
      headers: {
        Authorization: 'Basic YUBhLmNvbToxMjM0',
        'Content-Type': 'application/json',
      },
    });
  };

  useEffect(() => {
    if (!checkBox.includes(id)) {
      setCheck(false);
      return;
    }
    setCheck(true);
  }, [checkBox, id]);

  return { check, checkBoxOnChange, deleteItem };
};

export default useCartItem;
