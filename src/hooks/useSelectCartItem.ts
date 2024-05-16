import { useRecoilState } from "recoil";
import { cartItemSelected } from "../recoil/atoms";

export default function useSelectCartItem(id: number) {
  const [isSelected, setSelected] = useRecoilState(cartItemSelected(id));

  const toggleSelected = () => {
    setSelected((prev) => !prev);
  };

  return { isSelected, toggleSelected };
}
