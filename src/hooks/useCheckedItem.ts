import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartIdAtom, checkedCartIdAtom } from "../store/cartState";

const useCheckedItem = (length: number) => {
  const cartIdList = useRecoilValue(cartIdAtom);
  const [checkedIdList, setCheckedIdList] = useRecoilState(checkedCartIdAtom);
  const [checkedAll, setCheckedAll] = useState<boolean>(false);

  useEffect(() => {
    console.log(checkedIdList);
  }, [checkedIdList]);
  const changeIsChecked = (cartId: number) => {
    const check = checkedIdList.find((id) => id === cartId);
    if (check) setCheckedIdList((prev) => prev.filter((id) => id !== cartId));
    if (!check) setCheckedIdList((prev) => [...prev, cartId]);
    if (checkedIdList.length !== length) setCheckedAll(false);
    if (checkedIdList.length === length) setCheckedAll(true);
  };

  const changeIsCheckedAll = () => {
    if (checkedAll) setCheckedIdList([]);
    if (!checkedAll) setCheckedIdList([...cartIdList]);
    setCheckedAll(!checkedAll);
  };

  const deleteChecked = (cartId: number) => {
    setCheckedIdList((prev) => prev.filter((id) => id !== cartId));
  };

  const deleteCheckedAll = () => {
    const deletedCheck = [...checkedIdList];
    deletedCheck.forEach((check) => {
      deleteChecked(check);
    });
  };

  const countIsChecked = checkedIdList.reduce((count, value) => {
    return value ? count + 1 : count;
  }, 0);

  return {
    checkedIdList,
    checkedAll,
    countIsChecked,
    changeIsChecked,
    changeIsCheckedAll,
    deleteChecked,
    deleteCheckedAll,
  };
};

export default useCheckedItem;
