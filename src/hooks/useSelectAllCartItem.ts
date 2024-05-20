import { cartItemAllSelected } from "./../recoil/selectors";

import { useRecoilState } from "recoil";

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
