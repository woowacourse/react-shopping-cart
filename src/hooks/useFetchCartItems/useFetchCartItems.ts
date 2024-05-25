import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { cartItemsAtom, couponCheckedAtom } from "../../recoil/atom/atom";
import { fetchCartItems } from "../../api/cartItemApi";

export const useFetchCartItems = () => {
  const setCartItems = useSetRecoilState(cartItemsAtom);
  const setCheckedCoupons = useSetRecoilState(couponCheckedAtom);

  useEffect(() => {
    setCheckedCoupons([]);

    const fetchAndSetCartItems = async () => {
      const fetchedCartItems = await fetchCartItems();
      setCartItems(fetchedCartItems);
    };

    fetchAndSetCartItems();
  }, [setCartItems, setCheckedCoupons]);
};
