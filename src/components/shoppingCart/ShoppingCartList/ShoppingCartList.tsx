import CartItem from "../../../types/CartItem";
import { CheckedMap } from "../../../types/CheckMap";

import CartList from "../CartList/CartList";
import Receipt from "../Receipt/Receipt";

interface ShoppingCartListProps {
  cartItemList: CartItem[];
  checkedMap: CheckedMap;
  allChecked: boolean;
  toggleAll: () => void;
  handleSelectedCartItem: (id: number) => void;
  allProductPrice: number;
  shippingFee: number;
}

export default function ShoppingCartList({
  cartItemList,
  checkedMap,
  allChecked,
  toggleAll,
  handleSelectedCartItem,
  allProductPrice,
  shippingFee,
}: ShoppingCartListProps) {
  return (
    <div>
      <CartList
        cartItemList={cartItemList}
        checkedMap={checkedMap}
        allChecked={allChecked}
        toggleAll={toggleAll}
        handleSelectedCartItem={handleSelectedCartItem}
      />
      <Receipt
        totalPrice={allProductPrice + shippingFee}
        allProductPrice={allProductPrice}
        shippingFee={shippingFee}
      />
    </div>
  );
}
