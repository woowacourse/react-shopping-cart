import { useRecoilRefresher_UNSTABLE } from "recoil";
import { deleteCartItem } from "../../api";
import { cartListState } from "../../recoil/selectors";
import CartItemLocalStorage, { KEY } from "../../services/CartItemLocalStorage";
import type { CartItemType } from "../../types";
import CheckBox from "../common/CheckBox";
import CartItemQuantity from "./CartItemQuantity";

interface CartItemProps {
  cartItem: CartItemType;
}

export default function CartItem({ cartItem: { id, product } }: CartItemProps) {
  const refreshCartList = useRecoilRefresher_UNSTABLE(cartListState);

  const handleClickDeleteButton = async () => {
    await deleteCartItem(id);
    CartItemLocalStorage.delete(KEY, id);
    refreshCartList();
  };

  return (
    <li key={id}>
      <CheckBox id={id} />
      <img src={product.imageUrl} />
      <p className="productName">{product.name}</p>
      <div className="price">{product.price}</div>

      <CartItemQuantity itemId={id} />
      <button onClick={handleClickDeleteButton}>삭제</button>
    </li>
  );
}
