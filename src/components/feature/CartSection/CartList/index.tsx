import { CartProduct } from "../../../../type/cart";
import CheckBox from "../../../common/CheckBox";
import Card from "../CartProducts/Card";
import styled from "@emotion/styled";

type Props = {
  cartItems: CartProduct[] | undefined;
  selectedCartId: number[];
  setSelectedCartId: React.Dispatch<React.SetStateAction<number[]>>;
  refetch: () => void;
};

const CartList = ({
  cartItems,
  selectedCartId,
  setSelectedCartId,
  refetch,
}: Props) => {
  const isChecked = (id: number) => {
    return selectedCartId?.some((item: number) => item === id);
  };
  const isAllChecked = selectedCartId?.length === cartItems?.length;

  const handleAllSelected = () => {
    const isAllChecked = selectedCartId?.length === cartItems?.length;
    if (isAllChecked) {
      setSelectedCartId([]);
      return;
    }
    setSelectedCartId(cartItems?.map((item) => item.id) || []);
  };

  const handleToggle = (id: number) => {
    // 선택이 안되어 있음 -> 선택됨
    if (!selectedCartId?.find((item: number) => item === id)) {
      setSelectedCartId((prev) => [...prev, id]);
      return;
    }
    // 선택이 되어 있음 -> 선택안됨
    setSelectedCartId(selectedCartId?.filter((cartId) => cartId !== id));
  };

  const handleDelete = (id: number) => {
    if (!selectedCartId?.find((item: number) => item === id)) return;
    setSelectedCartId(selectedCartId?.filter((cartId) => cartId !== id));
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
