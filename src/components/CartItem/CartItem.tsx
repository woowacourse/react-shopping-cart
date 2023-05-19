import { Cart } from "../../types/types";

function CartItem({ cart }: { cart: Cart }) {
  return (
    <div>
      <div>쳌박</div>
      <div>
        <img src={cart.product.imageUrl} />
      </div>
      <div>{cart.product.name}</div>
      <div>
        <div>휴지통</div>
        <div>{cart.quantity}</div>
        <div>{cart.product.price}</div>
      </div>
    </div>
  )
}

export default CartItem;
