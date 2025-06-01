import { CartProduct } from "../../../../type/cart";
import CheckBox from "../../../common/CheckBox";
import Card from "../CartProducts/Card";
import styled from "@emotion/styled";

type Props = {
  cartItems: CartProduct[] | undefined;
  selectedCartIds: number[];
  setSelectedCartIds: React.Dispatch<React.SetStateAction<number[]>>;
  refetch: () => void;
};

const CartList = ({
  cartItems,
  selectedCartIds,
  setSelectedCartIds,
  refetch,
}: Props) => {
  const isChecked = (id: number) => {
    return selectedCartIds?.some((item: number) => item === id);
  };
  const isAllChecked = selectedCartIds?.length === cartItems?.length;

  const handleAllSelected = () => {
    const isAllChecked = selectedCartIds?.length === cartItems?.length;
    if (isAllChecked) {
      setSelectedCartIds([]);
      return;
    }
    setSelectedCartIds(cartItems?.map((item) => item.id) || []);
  };

  const handleToggle = (id: number) => {
    // 선택이 안되어 있음 -> 선택됨
    if (!selectedCartIds?.find((item: number) => item === id)) {
      setSelectedCartIds((prev) => [...prev, id]);
      return;
    }
    // 선택이 되어 있음 -> 선택안됨
    setSelectedCartIds(selectedCartIds?.filter((cartId) => cartId !== id));
  };

  const handleDelete = (id: number) => {
    if (!selectedCartIds?.find((item: number) => item === id)) return;
    setSelectedCartIds(selectedCartIds?.filter((cartId) => cartId !== id));
  };

  return (
    <>
      <CheckBox
        label="전체 선택"
        isChecked={isAllChecked}
        onChange={handleAllSelected}
        testId="all-selected"
      />
      <CardList data-testid="cart-list">
        {cartItems?.map((cartItem: CartProduct) => (
          <Card
            key={cartItem.id}
            cartItem={cartItem}
            onRefetch={refetch}
            isChecked={isChecked(cartItem.id)}
            onToggle={() => handleToggle(cartItem.id)}
            onDeleteSelected={() => handleDelete(cartItem.id)}
          />
        ))}
      </CardList>
    </>
  );
};

export default CartList;

export const CardList = styled.div`
  overflow: scroll;
  height: 400px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
  scrollbar-color: transparent transparent;
`;
