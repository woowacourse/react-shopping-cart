import CartItem from "../../../types/CartItem";
import CartItemCheck from "../../../types/CartItemCheck";
import * as S from "./ShoppingCartList.styles";
import Item from "../Item/Item";
import CheckBox from "../../common/CheckBox/CheckBox";

interface ShoppingCartListProps {
  cartItemList: CartItem[];
  cartItemCheckList: CartItemCheck[];
  allChecked: boolean;
  toggleAll: () => void;
  handleSelectedCartItem: (id: number) => void;
  handleSelectedCartItemQuantityUpdate: (id: number, quantity: number) => void;
  handleSelectedCartItemRemove: (id: number) => void;
}

export default function ShoppingCartList({
  cartItemList,
  cartItemCheckList,
  allChecked,
  toggleAll,
  handleSelectedCartItem,
  handleSelectedCartItemQuantityUpdate,
  handleSelectedCartItemRemove,
}: ShoppingCartListProps) {
  return (
    <section>
      <S.Flex>
        <CheckBox
          id="check-all"
          type="checkbox"
          checked={allChecked}
          onChange={toggleAll}
        />
        <label htmlFor="check-all">전체 선택</label>
      </S.Flex>

      {cartItemList.map((cart) => {
        const selected = cartItemCheckList.find((s) => s.id === cart.id);
        return (
          <Item
            key={cart.id}
            id={cart.id}
            isChecked={!!selected?.isChecked}
            handleSelectedCartItem={handleSelectedCartItem}
            imageUrl={cart.product.imageUrl}
            name={cart.product.name}
            price={cart.product.price}
            quantity={cart.quantity}
            handleSelectedCartItemQuantityUpdate={
              handleSelectedCartItemQuantityUpdate
            }
            handleSelectedCartItemRemove={handleSelectedCartItemRemove}
          />
        );
      })}
    </section>
  );
}
