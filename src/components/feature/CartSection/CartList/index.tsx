import { CartProduct } from "../../../../type/cart";
import CheckBox from "../../../common/CheckBox";
import Card from "../CartProducts/Card";
import styled from "@emotion/styled";
import { deleteCartProduct } from "../../../../api/cart/deleteCartProduct";
import { updateCartProduct } from "../../../../api/cart/updateCartProduct";
import { useShowError } from "../../../../provider/errorProvider";

type Props = {
  cartItems: CartProduct[] | undefined;
  selectedCartIds: number[];
  onSelectCartItem: (newSelectedCartIds: number[]) => void;
  refetch: () => void;
};

const CartList = ({
  cartItems,
  selectedCartIds,
  onSelectCartItem,
  refetch,
}: Props) => {
  const showError = useShowError();

  const isChecked = (id: number) => {
    return selectedCartIds?.some((item: number) => item === id);
  };
  const isAllChecked = selectedCartIds?.length === cartItems?.length;

  const handleAllSelected = () => {
    const isAllChecked = selectedCartIds?.length === cartItems?.length;
    if (isAllChecked) {
      onSelectCartItem([]);
      return;
    }

    onSelectCartItem(cartItems?.map((item) => item.id) || []);
  };

  const handleToggle = (id: number) => {
    // 선택이 안되어 있음 -> 선택됨
    if (!selectedCartIds?.find((item: number) => item === id)) {
      onSelectCartItem([...selectedCartIds, id]);
      return;
    }
    // 선택이 되어 있음 -> 선택안됨
    onSelectCartItem(selectedCartIds?.filter((cartId) => cartId !== id));
  };

  const handleDelete = async (id: number) => {
    if (!selectedCartIds?.find((item: number) => item === id)) return;
    onSelectCartItem(selectedCartIds?.filter((cartId) => cartId !== id));
    try {
      await deleteCartProduct(id);
      refetch();
    } catch (e) {
      showError?.("데이터를 삭제하는 중 문제가 발생했습니다.");
    }
  };

  const handleUpdate = async (id: number, updatedQuantity: number) => {
    try {
      await updateCartProduct(id, updatedQuantity);
      refetch();
    } catch (e) {
      showError?.("상품을 추가/삭제하는 중 문제가 발생했습니다.");
    }
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
            isChecked={isChecked(cartItem.id)}
            onToggle={() => handleToggle(cartItem.id)}
            onDelete={(id: number) => handleDelete(id)}
            onUpdate={(id: number, count: number) => handleUpdate(id, count)}
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
