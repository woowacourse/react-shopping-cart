import { useSetRecoilState } from "recoil";
import { cartItemsAtom, cartItemCheckedIdsAtom } from "../../recoil/atom/atom";
import { patchCartItemQuantity, deleteCartItem } from "../../api/cartItemApi";
import { Product } from "../../types/product";

export const useCartActions = () => {
  const setCartItems = useSetRecoilState(cartItemsAtom);
  const setCheckedIds = useSetRecoilState(cartItemCheckedIdsAtom);

  const handleUpdateQuantity = (product: Product, newQuantity: number) => {
    try {
      patchCartItemQuantity(product.id, newQuantity);
      setCartItems((prevItems) => prevItems.map((item) => (item.id === product.id ? { ...item, quantity: newQuantity } : item)));
    } catch (error) {
      //TODO: error 핸들러 만들기
      console.error("Failed to update quantity:", error);
    }
  };

  const handleDeleteItem = (id: number) => {
    try {
      deleteCartItem(id);
      setCartItems((prev) => prev.filter((cartItem) => id !== cartItem.id));
      setCheckedIds((prev) => prev.filter((itemId) => id !== itemId));
    } catch (error) {
      //TODO: error 핸들러 만들기
      console.error("Failed to delete cart item:", error);
    }
  };

  return { handleUpdateQuantity, handleDeleteItem };
};
