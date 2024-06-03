import { useRecoilState } from "recoil";
import { cartItemCheckedIdsAtom, cartItemsAtom } from "../../recoil/atom/atom";

export const useCartItemChecked = () => {
  const [cartItems] = useRecoilState(cartItemsAtom);
  const [checkedIds, setCheckedIds] = useRecoilState(cartItemCheckedIdsAtom);

  // 하나 선택
  const handleCheckedIds = (productId: number) => {
    setCheckedIds((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]));
  };

  // 전체 선택
  const isAllChecked = cartItems.length > 0 && cartItems.length === checkedIds.length;

  const setAllChecked = (newIsAllChecked: boolean) => {
    const newCheckedIds = newIsAllChecked ? cartItems.map((item) => item.id) : [];
    setCheckedIds(newCheckedIds);
  };

  const handleAllChecked = () => {
    setAllChecked(!isAllChecked);
  };

  return { checkedIds, handleCheckedIds, isAllChecked, setAllChecked, handleAllChecked };
};
