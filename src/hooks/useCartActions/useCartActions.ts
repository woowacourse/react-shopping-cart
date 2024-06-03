import { useSetRecoilState } from "recoil";
import { cartItemsAtom, cartItemCheckedIdsAtom } from "../../recoil/atom/atom";
import { patchCartItemQuantity, deleteCartItem } from "../../api/cartItem";
import { Product } from "../../types/product";

export const useCartActions = () => {
  const setCartItems = useSetRecoilState(cartItemsAtom);
  const setCheckedIds = useSetRecoilState(cartItemCheckedIdsAtom);

  const handleUpdateQuantity = (product: Product, newQuantity: number) => {
    try {
      patchCartItemQuantity(product.id, newQuantity);
      setCartItems((prevItems) => prevItems.map((item) => (item.id === product.id ? { ...item, quantity: newQuantity } : item)));
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDeleteItem = (id: number) => {
    try {
      deleteCartItem(id);
      setCartItems((prev) => prev.filter((cartItem) => id !== cartItem.id));
      setCheckedIds((prev) => prev.filter((itemId) => id !== itemId));
    } catch (error) {
      alert(error.message);
    }
  };

  return { handleUpdateQuantity, handleDeleteItem };
};
