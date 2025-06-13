import { CartItemTypes } from '../../../types/cartItem';
import { Line } from '../../Common/Line/Line';
import { CartProduct } from '../CartProduct/CartProduct';
import {
  CartProductContainerLayout,
  CartProductList,
  CartItemBox,
} from './SelectedCartProductContainer.style';

interface SelectedCartProductContainerProps {
  cartItems: CartItemTypes[];
}

export function SelectedCartProductContainer({
  cartItems,
}: SelectedCartProductContainerProps) {
  return (
    <>
      <div css={CartProductContainerLayout}>
        <section css={CartProductList}>
          {cartItems.map((item) => {
            return (
              <div css={CartItemBox} key={item.id}>
                <Line />
                <CartProduct
                  id={item.id}
                  imageUrl={item.product.imageUrl}
                  name={item.product.name}
                  price={item.product.price}
                  quantity={item.quantity}
                  mode="info"
                />
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
}
