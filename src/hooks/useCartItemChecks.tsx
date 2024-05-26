import { useRecoilState } from "recoil";
import { cartItemCheckedIdsAtom, cartItemsAtom } from "../recoil/atom/atom";
import { allCheckedSelector } from "../recoil/selector/selector";

const useCartItemChecks = () => {
  const [cartItems, setCartItems] = useRecoilState(cartItemsAtom);
  const [checkedIds, setCheckedIds] = useRecoilState(cartItemCheckedIdsAtom);
  const [isAllChecked, setIsAllChecked] = useRecoilState(allCheckedSelector);

  return {
    cartItems,
    setCartItems,
    checkedIds,
    setCheckedIds,
    isAllChecked,
    setIsAllChecked,
  };
};

export default useCartItemChecks;
