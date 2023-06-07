import { checkCartListState } from '../service/atom';
import { useRecoilState } from 'recoil';
import { useState, useEffect } from 'react';

const useCheckCart = (cartId: number) => {
  const [checkCartList, setCheckCartList] = useRecoilState(checkCartListState);

  const [check, setCheck] = useState(
    checkCartList.findIndex((checkCartId) => checkCartId === cartId) !== -1,
  );

  const changeCheckCartList = () => {
    const existItemIndex = checkCartList.findIndex((checkCartId) => checkCartId === cartId);

    if (check) {
      if (existItemIndex !== -1) {
        setCheckCartList((prev) => {
          const newCartList = [...prev];
          newCartList.splice(existItemIndex, 1);
          return newCartList;
        });
      }
      setCheck(false);
      return;
    }
    setCheckCartList((prev) => [...prev, cartId]);
    setCheck(true);
  };

  useEffect(() => {
    const existItemIndex = checkCartList.findIndex((checkCartId) => checkCartId === cartId);

    if (existItemIndex === -1) {
      setCheck(false);
      return;
    }
    setCheck(true);
  }, [checkCartList]);

  return {
    check,
    changeCheckCartList,
  };
};

export default useCheckCart;
