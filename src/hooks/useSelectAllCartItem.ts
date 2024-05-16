import { useRecoilState } from "recoil";
import { cartItemAllSelected } from "../recoil/selectors";

export default function useSelectAllCartItem() {
  const [isAllSelected, setAllSelected] = useRecoilState(cartItemAllSelected);

  const toggleAllSelected = () => {
    setAllSelected((prev) => !prev);
  };

  return {
    isAllSelected,
    toggleAllSelected,
  };
}
