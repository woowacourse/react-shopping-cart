import { Line } from "../../../../components/Line/Line";
import { CartProduct } from "../../../shopping-cart/components/CartProduct/CartProduct";
import { useCart } from "../../../shopping-cart/context/cartProvider";
import { cartListLayout } from "./SelectedCartList.style";

export function SelectedCartList() {
  const { deleteCartItem, cartItems, error } = useCart();
  return (
    <div css={cartListLayout}>
      {cartItems.map((item) => {
        return (
          <>
            <Line />
            <CartProduct
              key={item.id}
              id={item.id}
              imageUrl={item.product.imageUrl}
              name={item.product.name}
              price={item.product.price}
              quantity={item.quantity}
            />
          </>
        );
      })}
    </div>
  );
}
