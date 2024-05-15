import { useRecoilState } from "recoil";
import { cartItemAllSelected } from "../../recoil/selectors";
import type { CartItemType } from "../../types";
import CartItem from "../CartItem";

export default function CartList({ items }: { items: CartItemType[] }) {
  const [isAllSelected, setAllSelected] = useRecoilState(cartItemAllSelected);

  const handleClick = () => {
    setAllSelected((prev) => !prev);
  };

  return (
    <>
      <button onClick={handleClick}>
        {isAllSelected ? "전체선택함" : "전체 선택안함"}
      </button>
      <ul>
        {items &&
          items.map((item, index) => <CartItem key={index} cartItem={item} />)}
      </ul>
    </>
  );
}
