import CartItem from "../../../types/CartItem";
import CartItemCheck from "../../../types/CartItemCheck";
import { Flex, Checkbox } from "./ShoppingCartList.styles";
import Item from "../Item/Item";

interface ShoppingCartListProps {
  cartItemList: CartItem[];
  cartItemCheckList: CartItemCheck[];
  allChecked: boolean;
  toggleAll: () => void;
  handleSelectedCartItem: (id: number) => void;
}

export default function ShoppingCartList({
  cartItemList,
  cartItemCheckList,
  allChecked,
  toggleAll,
  handleSelectedCartItem,
}: ShoppingCartListProps) {
  return (
    <section>
      <Flex>
        <Checkbox type="checkbox" checked={allChecked} onChange={toggleAll} />
        <label>전체 선택</label>
      </Flex>

      {cartItemList.map((cart) => {
        const selected = cartItemCheckList.find((s) => s.id === cart.id);
        return (
          <Item
            key={cart.id}
            id={cart.id}
            isChecked={!!selected?.isClicked}
            handleSelectedCartItem={handleSelectedCartItem}
            imageUrl={cart.product.imageUrl}
            name={cart.product.name}
            price={cart.product.price}
            quantity={cart.quantity}
          />
        );
      })}
    </section>
  );
}
