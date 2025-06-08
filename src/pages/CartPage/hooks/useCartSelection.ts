import { CartItemContent } from "../../../types/cartItem";
import { usePersistedState } from "../../../hooks/usePersistedState";
import { STORAGE_KEYS } from "../../../constants";
import { storageHandler } from "../../../utils/storageHandler";

type HandleCheckChangeType = ({ action, id }: { action: "all" | "each"; id?: number }) => void;

export const useCartSelection = (cartItems: CartItemContent[]) => {
  const initialCheckedIds = cartItems.map((item) => item.id);
  const [checkedIds, setCheckedIds] = usePersistedState<number[]>(STORAGE_KEYS.CART_CHECKED_IDS, initialCheckedIds);

  const handleCheckChange: HandleCheckChangeType = ({ action, id }) => {
    if (action === "all") {
      const isAllChecked = cartItems.every((item) => checkedIds.includes(item.id));
      const newCheckedIds = isAllChecked ? [] : cartItems.map((item) => item.id);
      setCheckedIds(newCheckedIds);
    }

    if (action === "each" && id) {
      const getCheckIds = storageHandler.getItem(STORAGE_KEYS.CART_CHECKED_IDS);
      if (getCheckIds.includes(id)) {
        setCheckedIds(getCheckIds.filter((checkedId: number) => checkedId !== id));
        return;
      }
      setCheckedIds([...checkedIds, id]);
    }
  };

  return { checkedIds, handleCheckChange };
};
