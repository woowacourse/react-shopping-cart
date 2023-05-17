import CheckBox from '../Common/CheckBox';
import Image from '../Common/Image';

import type { CartProduct } from '../../types/product';
import TrashCanIcon from '../../assets/TrashCanIcon';
import AmountCounter from '../Common/AmountCounter';
import useCartProducts from '../../hooks/useCartProducts';
import useProductQuantity from '../../hooks/useProductQuantity';

interface CartProductItemProps {
  cartProduct: CartProduct;
}

const CartProductItem = ({ cartProduct }: CartProductItemProps) => {
  const { quantity, product } = cartProduct;
  const { id, name, price, imageUrl } = product;
  const { addCount, subtractCount } = useProductQuantity(id);

  return (
    <>
      <CheckBox />
      <Image
        src={`${process.env.PUBLIC_URL}/${imageUrl}`}
        alt={name}
        loading='lazy'
        size='small'
      />
      <p>{name}</p>
      <TrashCanIcon />
      <AmountCounter
        count={quantity}
        addCount={addCount}
        subtractCount={subtractCount}
      />
      <p>{price}</p>
    </>
  );
};

export default CartProductItem;
