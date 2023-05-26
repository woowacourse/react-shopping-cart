import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { cartAtom } from '@recoil/atoms/cartAtom';
import { checkBoxAtom } from '@recoil/atoms/checkBoxAtom';
import { checkBoxTotalIdtAtom } from '@recoil/atoms/checkBoxTotalIdtAtom';
import { CartInformation } from '@type/types';
import fetchApi from '@utils/fetchApi';
import { CART_URL } from '@constants/common';
import useAtomLocalStorage from './useAtomLocalStorage';
import useGetFetch from './useGetFetch';

interface CartListReturnProps {
  data: CartInformation[] | null;
  checkBoxTotalIdOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checkBox: number[];
  checkBoxTotalId: number[];
  removeCartOnClick: () => void;
  check: boolean;
  refetch: () => void;
}

const useCartList = (): CartListReturnProps => {
  const { data, refetch } = useGetFetch<CartInformation[]>('/cart-items', {
    method: 'get',
    headers:{
      Authorization: 'Basic YUBhLmNvbToxMjM0',
      'Content-Type': 'application/json',
    }
  });

  const setData = useSetRecoilState(cartAtom);

  const [checkBox, setCheckBox] = useAtomLocalStorage<number[]>(
    checkBoxAtom,
    'checkBox'
  );

  const [checkBoxTotalId, setCheckBoxTotalId] = useAtomLocalStorage<number[]>(
    checkBoxTotalIdtAtom,
    'checkBoxTotalId'
  );

  const [check, setCheck] = useState(false);

  const checkBoxTotalIdOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheck(true);
      setCheckBox(checkBoxTotalId);
      return;
    }
    setCheckBox([]);
    setCheck(false);
    refetch();
  };

  useEffect(() => {
    if (checkBox.length === checkBoxTotalId.length) {
      setCheck(true);
      return;
    }
    setCheck(false);
  }, [checkBox, checkBoxTotalId]);

  const removeCartOnClick = () => {
    if (!data) return;

    const removedCart = data.filter(
      (product) =>
        checkBox.includes(product.id) && checkBoxTotalId.includes(product.id)
    );

    const notRemoveCart = data.filter(
      (product) =>
        !checkBox.includes(product.id) && checkBoxTotalId.includes(product.id)
    );

    setData(notRemoveCart);
    removedCart.forEach(async (product) => {
      await fetchApi(`${CART_URL}/${product.id}`, {
        method: 'delete',
        headers:{
          Authorization: 'Basic YUBhLmNvbToxMjM0',
          'Content-Type': 'application/json',
        }
      });
    });
    const removedCheckBox = checkBoxTotalId.filter(
      (id) => !checkBox.includes(id)
    );
    setCheckBox(removedCheckBox);
    setCheckBoxTotalId(removedCheckBox);
    refetch();
  };

  return {
    data,
    checkBoxTotalIdOnChange,
    checkBox,
    checkBoxTotalId,
    removeCartOnClick,
    check,
    refetch,
  };
};

export default useCartList;
