import { selector } from "recoil";
import { fetchCartItems } from "../../api/cartItemApi";
import { fetchCoupons } from "../../api/couponApi";

// 장바구니 상품 조회 api 호출
export const fetchCartItemsSelector = selector({
  key: "fetchCartItemsSelector",
  get: async () => {
    const cartItems = await fetchCartItems();
    console.log("cartItems 호출", cartItems);
    return cartItems;
  },
});

// 쿠폰 조회 api 호출
export const fetchCouponsSelector = selector({
  key: "fetchCouponsSelector",
  get: async () => {
    const coupons = await fetchCoupons();
    return coupons;
  },
});
