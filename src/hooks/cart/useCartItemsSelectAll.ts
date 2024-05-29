// import { useRecoilState, useRecoilValue } from "recoil";

// import { cartItemsState } from "@/recoil/cartItems";
// import { selectedCartItemsIdState } from "@/recoil/selectedCardItems";

// const useCartItemsSelectAll = () => {
//   const [selectedItemsId, setSelectedItemsId] = useRecoilState(
//     selectedCartItemsIdState
//   );
//   const cartItemState = useRecoilValue(cartItemsState);

//   const isAllItemSelected = cartItemState.length === selectedItemsId.length;

//   const selectAllItem = () => {
//     const allItemsId = cartItemState.map((item) => item.id);
//     setSelectedItemsId(allItemsId);
//   };

//   const unselectAllItem = () => {
//     setSelectedItemsId([]);
//   };

//   return {
//     selectAllItem,
//     unselectAllItem,
//     isAllItemSelected,
//   };
// };

// export default useCartItemsSelectAll;
