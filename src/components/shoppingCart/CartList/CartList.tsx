import Item from "../Item/Item";

import * as Styled from "./CartList.styles";

import CartItem from "../../../types/CartItem";
import { CheckedMap } from "../../../types/CheckMap";

interface CartListProps {
  cartItemList: CartItem[];
  checkedMap: CheckedMap;
  allChecked: boolean;
  toggleAll: () => void;
  handleSelectedCartItem: (id: number) => void;
}

export default function CartList({
  cartItemList,
  checkedMap,
  allChecked,
  toggleAll,
  handleSelectedCartItem,
}: CartListProps) {
  return (
    <section>
      <Styled.Checkbox>
        <Styled.Input
          id="check-all"
          type="checkbox"
          checked={allChecked}
          onChange={toggleAll}
        />
        <label htmlFor="check-all">전체 선택</label>
      </Styled.Checkbox>

      {cartItemList.map((cart) => {
        const isChecked = checkedMap.get(cart.id) ?? true;

        return (
          <Item
            key={cart.id}
            id={cart.id}
            isChecked={isChecked}
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
