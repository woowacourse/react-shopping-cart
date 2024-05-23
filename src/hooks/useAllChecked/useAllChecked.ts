import { useRecoilState } from "recoil";
import { cartItemCheckedIdsAtom, cartItemsAtom } from "../../recoil/atom/atom";

export const useAllChecked = (): [boolean, (newIsAllChecked: boolean) => void] => {
  const [cartItems] = useRecoilState(cartItemsAtom);
  const [checkedIds, setCheckedIds] = useRecoilState(cartItemCheckedIdsAtom);

  const isAllChecked = cartItems.length > 0 && cartItems.length === checkedIds.length;

  const setAllChecked = (newIsAllChecked: boolean) => {
    const newCheckedIds = newIsAllChecked ? cartItems.map((item) => item.id) : [];
    setCheckedIds(newCheckedIds);
  };

  return [isAllChecked, setAllChecked];
};
