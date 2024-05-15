// import CheckedIcon from "../../../assets/checkedIcon.svg";
// import UnCheckedIcon from "../../../assets/uncheckedIcon.svg";

import { useRecoilState } from "recoil";
import { cartItemSelected } from "../../../recoil/atoms";
import { CartItemType } from "../../../types";

export default function CheckBox({ id }: Pick<CartItemType, "id">) {
  const [isCartItemSelected, setCartItemSelected] = useRecoilState(
    cartItemSelected(id)
  );

  const handleCheckBoxClick = () => {
    setCartItemSelected((prev) => !prev);
  };

  return (
    <button onClick={handleCheckBoxClick}>
      {isCartItemSelected ? "체크됨" : "체크안됨"}
    </button>
  );
}
