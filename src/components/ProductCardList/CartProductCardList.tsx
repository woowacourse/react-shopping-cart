import { CartProductCard } from './ProductCard/CartProductCard';
import FlexBox from 'components/@common/FlexBox';
import { CartProduct } from 'types/product';

type Props = {
  cartProducts: CartProduct[];
};

export const CartProductCardList = ({ cartProducts }: Props) => {
  return (
    <>
      {cartProducts.map((cartProduct) => (
        <CartProductCard key={cartProduct.id} cartProduct={cartProduct} />
      ))}
    </>
  );
};
