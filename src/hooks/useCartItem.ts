import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { cartAtom } from '@recoil/atoms/cartAtom';
import { checkBoxAtom } from '@recoil/atoms/checkBoxAtom';
import { checkBoxTotalIdtAtom } from '@recoil/atoms/checkBoxTotalIdtAtom';
import fetchApi from '@utils/fetchApi';
import { CART_URL } from '@constants/common';
import useAtomLocalStorage from './useAtomLocalStorage';

const useCartItem = (id: number) => {
  const [value, setData] = useRecoilState(cartAtom);

  const [checkBox, setCheckBox] = useAtomLocalStorage<number[]>(
    checkBoxAtom,
    'checkBox'
  );

  const [checkBoxTotalId, setCheckBoxTotalId] = useAtomLocalStorage<number[]>(
    checkBoxTotalIdtAtom,
    'checkBoxTotalId'
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
    await fetchApi(`${CART_URL}/${id}`, {
      method: 'delete',
    });

    const updatedId = checkBoxTotalId.filter((checkId) => checkId !== id);
    const updatedCart = value.filter(
      (product) => !checkBoxTotalId.includes(product.id)
    );
    setCheckBox(updatedId);
    setCheckBoxTotalId(updatedId);
    setData(updatedCart);
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
