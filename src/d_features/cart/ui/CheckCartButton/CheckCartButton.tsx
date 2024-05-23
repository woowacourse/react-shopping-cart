import { CartId } from '@/e_entities/cart';
import { Checkbox } from '@/f_shared/ui/Checkbox/Checkbox';

interface CheckCartButtonProps {
  cartId: CartId;
}

// TODO: Add handler with state
export const CheckCartButton = ({ cartId }: CheckCartButtonProps) => {
  const checked = false; // temp

  return (
    <Checkbox
      checked={checked}
      onChange={() => {
        console.log(cartId);
      }}
    />
  );
};
