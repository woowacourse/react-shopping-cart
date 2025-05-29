import { useEffect, useState } from 'react';
import { patchCartItem, deleteCartItem } from '../apis/cartItem';
import { Content } from '../types/cartItems';

interface UseCartQuantityProps {
  productId: number;
  stock: number;
  selectedCartItem?: Content;
  onChange: () => void;
}

export default function useCartQuantity({ stock, selectedCartItem, onChange }: UseCartQuantityProps) {
  const [quantity, setQuantity] = useState(selectedCartItem?.quantity ?? 0);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setQuantity(selectedCartItem?.quantity ?? 0);
  }, [selectedCartItem]);

  const handleIncrease = async () => {
    const next = quantity + 1;
    if (next > stock) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
      return;
    }
    await patchCartItem({ id: selectedCartItem!.id, quantity: next });
    setQuantity(next);
    onChange();
  };

  const handleDecrease = async () => {
    const next = quantity - 1;
    if (next === 0) {
      await deleteCartItem(selectedCartItem!.id);
    } else {
      await patchCartItem({ id: selectedCartItem!.id, quantity: next });
    }
    setQuantity(next);
    onChange();
  };

  return {
    quantity,
    showToast,
    handleIncrease,
    handleDecrease,
  };
}
