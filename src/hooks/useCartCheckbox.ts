import { removeCartItem } from "api/cartItems";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartListState, checkedItemList } from "recoil/cart";

export const useCartCheckbox = () => {
  const [cartList, setCartList] = useRecoilState(cartListState);
  const checkedList = useRecoilValue(checkedItemList);

  const setIsChecked = (cartItemId: number, isChecked: boolean) => {
    const newList = [...cartList];

    const index = cartList.findIndex((item) => item.id === cartItemId);
    if (index === -1) return;

    newList[index] = { ...newList[index], isChecked: isChecked };

    setCartList(newList);
  };

  const changeAllCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCartList(
      cartList.map((item) => {
        return { ...item, isChecked: e.target.checked };
      })
    );
  };

  const removeCheckedItem = async () => {
    const removedList = checkedList.filter((item) => removeItem(item.id));
    const newList = cartList.filter((item) => !removedList.includes(item));

    if (checkedList.length !== removedList.length)
      alert("삭제 요청이 일부 실패하였습니다. 새로고침 후 다시 시도해주세요.");

    setCartList(newList);
  };

  const removeItem = async (id: number) => {
    const result = await removeCartItem(id);

    return result;
  };

  return { setIsChecked, changeAllCheckbox, removeCheckedItem };
};
