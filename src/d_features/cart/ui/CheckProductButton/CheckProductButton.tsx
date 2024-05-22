import { ProductId } from '@/e_entities/product';
import { Checkbox } from '@/f_shared/ui/Checkbox/Checkbox';

interface CheckProductButtonProps {
  productId: ProductId;
}

// TODO: Add handler with state
export const CheckProductButton = ({ productId }: CheckProductButtonProps) => {
  const checked = false; // temp

  return (
    <Checkbox
      checked={checked}
      onChange={() => {
        console.log(productId);
      }}
    />
  );
};
