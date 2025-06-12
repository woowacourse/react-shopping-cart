import { Line } from "../../../../components/Line/Line";
import { useSelectedCartContext } from "../../../common/context/selectedCartProvider";
import { CartProduct } from "../../../shopping-cart/components/CartProduct/CartProduct";
import { CartItemTypes } from "../../../shopping-cart/types/cartItem";
import { cartListLayout } from "./SelectedCartList.style";

export function SelectedCartList({
  cartItems,
}: {
  cartItems: CartItemTypes[];
}) {
  const { selectedCartIds } = useSelectedCartContext();

  return (
    <div css={cartListLayout}>
      {cartItems
        .filter((item) => selectedCartIds.includes(item.id.toString()))
        .map((item) => {
          return (
            <>
              <Line />
              <CartProduct
                key={item.id}
                id={item.id}
                imageUrl={item.product.imageUrl}
                name={item.product.name}
                price={item.product.price}
              >
                <p>{item.quantity}개</p>
              </CartProduct>
            </>
          );
        })}
    </div>
  );
}
