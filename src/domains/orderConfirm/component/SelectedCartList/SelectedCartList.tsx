import { Line } from "../../../../components/Line/Line";
import { CartProduct } from "../../../shopping-cart/components/CartProduct/CartProduct";
import { useCartContext } from "../../../common/context/cartProvider";
import { cartListLayout } from "./SelectedCartList.style";
import { useSelectedCartContext } from "../../../common/context/selectedCartProvider";

export function SelectedCartList() {
  const { cartItems } = useCartContext();
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
