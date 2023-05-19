import {Cart} from "../../types/types";
import CartController from "../CartController";
import {
  CartItemControllerWrapper,
  CartItemImage,
  CartItemInfo, CartItemInfoWrapper,
  CartItemLayout,
  CartItemName,
  CartItemPrice,
  CartItemTrashImage
} from "./CartItem.style";
import trashIcon from '../../assets/trash.png';

function CartItem({cart}: { cart: Cart }) {

  return (
    <CartItemLayout>
      <div>
        <input type="checkbox"/>
      </div>
      <CartItemImage src={cart.product.imageUrl}/>
      <CartItemInfoWrapper>
        <CartItemInfo>
          <CartItemName>{cart.product.name}</CartItemName>
          <CartItemControllerWrapper>
            <CartItemTrashImage src={trashIcon}/>
            <CartController product={cart.product}/>
          </CartItemControllerWrapper>
        </CartItemInfo>
        <CartItemPrice>{cart.product.price}원</CartItemPrice>
      </CartItemInfoWrapper>
    </CartItemLayout>
  )
}

export default CartItem;
