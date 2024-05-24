import { useRecoilState } from "recoil";
import { checkedCartItemsState } from "../recoil/atoms";

const useCheckCartItem = () => {
  const [checkedCartItems, setCheckedCartItems] = useRecoilState(checkedCartItemsState);

  const checkCartItem = (id: number) => setCheckedCartItems((prevSelected) => [...prevSelected, id]);
  const uncheckCartItem = (id: number) =>
    setCheckedCartItems((prevSelected) => prevSelected.filter((_id) => _id !== id));

  return { checkedCartItems, checkCartItem, uncheckCartItem };
};

export default useCheckCartItem;
