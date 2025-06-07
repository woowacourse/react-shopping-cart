import { Line } from "../../../../components/Line/Line";
import { CartProduct } from "../../../shopping-cart/components/CartProduct/CartProduct";
import { useCartContext } from "../../../common/context/cartProvider";
import { cartListLayout } from "./SelectedCartList.style";

export function SelectedCartList() {
  const { deleteCartItem, cartItems, error } = useCartContext();

  // todo : cartProduct에서 값만 보여주도록 수정
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
