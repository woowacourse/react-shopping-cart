import { useCartItemContext } from "@/pages/cart/contexts/CartItemProvider";
import useToast from "@/shared/hooks/useToast";
import CartItem from "../CartItem/CartItem";
import type { CartItemType } from "@/apis/cartItems/cartItem.type";
import useCartItemMutation from "@/pages/cart/hooks/useCartItemMutation";

type CartItemWithContextProps = {
  cartItem: CartItemType;
  isChecked: boolean;
  onCheck: (id: number, isChecked: boolean) => void;
  onRemove: (id: number) => void;
};

export default function CartItemWithContext({
  cartItem,
  isChecked,
  onCheck,
  onRemove,
}: CartItemWithContextProps) {
  const { refetchCartItems } = useCartItemContext();
  const { addToast } = useToast();

  const { updateCartItem, removeCartItem } = useCartItemMutation({
    onSuccess: refetchCartItems,
    onError: (error) => {
      addToast({
        type: "error",
        message: error.message,
      });
    },
  });

  const handleRemove = async (id: number) => {
    await removeCartItem(id);
    onRemove(id);
  };

  return (
    <CartItem
      cartItem={cartItem}
      isChecked={isChecked}
      onCheck={onCheck}
      onUpdateQuantity={updateCartItem}
      onRemove={handleRemove}
    />
  );
}
