import { OrderId } from '@/e_entities/product';
import { Checkbox } from '@/f_shared/ui/Checkbox/Checkbox';

interface CheckProductButtonProps {
  orderId: OrderId;
}

// TODO: Add handler with state
export const CheckProductButton = ({ orderId }: CheckProductButtonProps) => {
  const checked = false; // temp

  return (
    <Checkbox
      checked={checked}
      onChange={() => {
        console.log(orderId);
      }}
    />
  );
};
