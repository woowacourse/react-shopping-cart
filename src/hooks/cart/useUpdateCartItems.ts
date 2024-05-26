// import { getCartItems } from "@/auth/apis/cart";
// import { cartItemSelector, cartItemsState } from "@/recoil/cartItems";
// import { useEffect } from "react";
// import { useRecoilState, useRecoilValueLoadable } from "recoil";

// const useUpdateCartItems = () => {
//   const [cartItems, setCartItems] = useRecoilState(cartItemsState);
//   const cartItemsLoadable = useRecoilValueLoadable(cartItemSelector);

//   useEffect(() => {
//     if (cartItemsLoadable.state === "hasValue") {
//       setCartItems(cartItemsLoadable.contents);
//     }
//   }, [cartItemsLoadable, setCartItems]);

//   const updateFreshCartItems = async () => {
//     const newCartItems = await getCartItems();
//     setCartItems(newCartItems);
//   };

//   return { cartItems, updateFreshCartItems };
// };

// export default useUpdateCartItems;
