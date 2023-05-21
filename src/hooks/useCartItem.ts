import { useEffect, useState } from 'react';
import { checkBoxAtom } from '@recoil/atoms/checkBoxAtom';
import { checkBoxTotalIdtAtom } from '@recoil/atoms/checkBoxTotalIdtAtom';
import fetchApi from '@utils/fetchApi';
import useAtomLocalStorage from './useAtomLocalStorage';

const useCartItem = (id: number) => {
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
    await fetchApi(`/cart-items/${id}`, {
      method: 'delete',
    });

    const updatedId = checkBoxTotalId.filter((checkId) => checkId !== id);

    setCheckBox(updatedId);
    setCheckBoxTotalId(updatedId);
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
