import { ProductId } from '@/e_entities/product';
import { Text } from '@/f_shared';

import { UpdateProductQuantityButton } from '../UpdateProductQuantityButton/UpdateProductQuantityButton';

import css from './ProductQuantityAdjuster.module.css';

interface ProductQuantityAdjusterProps {
  productId: ProductId;
  quantity: number;
}

export const ProductQuantityAdjuster = ({ productId, quantity }: ProductQuantityAdjusterProps) => {
  return (
    <div className={css.root}>
      <UpdateProductQuantityButton productId={productId} type={'decrease'} />
      <Text tag={'span'} type={'b2'} className={css.text}>
        {quantity}
      </Text>
      <UpdateProductQuantityButton productId={productId} type={'increase'} />
    </div>
  );
};
