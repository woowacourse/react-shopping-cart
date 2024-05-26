import { useRecoilValue, useSetRecoilState } from "recoil";
import { checkedCartItemsQuantityState, getCartItems, getCoupons } from "../recoil/selectors";
import { cartItemsStates, checkedCartItemsState } from "../recoil/atoms";
import { postOrders } from "../api/cartItem";
import { useNavigate } from "react-router-dom";
import PAGE_URL from "../constants/pageURL";
import { ERROR_MESSAGE, SHOPPING_MESSAGE } from "../constants/messages";

const useCheckOrder = () => {
  const fetchedCartItems = useRecoilValue(getCartItems);
  const couponLists = useRecoilValue(getCoupons);
  const checkedCartItems = useRecoilValue(checkedCartItemsState);
  const checkedCartItemsQuantity = useRecoilValue(checkedCartItemsQuantityState);
  const setCartItems = useSetRecoilState(cartItemsStates);

  const router = useNavigate();

  const checkedCartItemList = fetchedCartItems.filter((item) => checkedCartItems.includes(item.id));
  if (checkedCartItemList.length === 0) router(-1);

  const totalOrderingDescription = SHOPPING_MESSAGE.orderDescription(checkedCartItems.length, checkedCartItemsQuantity);

  const postShoppingOrders = async () => {
    if (!confirm(SHOPPING_MESSAGE.confirmPaying)) return;

    const res = await postOrders(checkedCartItems);
    if (res.status === 201) {
      router(PAGE_URL.CompleteOrder);
      setCartItems((prevCartItems) => prevCartItems.filter((item) => !checkedCartItems.includes(item.id)));
      return;
    }

    alert(ERROR_MESSAGE.paymentError);
  };

  return { couponLists, checkedCartItemList, totalOrderingDescription, postShoppingOrders };
};

export default useCheckOrder;
