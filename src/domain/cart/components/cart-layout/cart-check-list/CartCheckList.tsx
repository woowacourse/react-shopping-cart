import styled from "@emotion/styled";
import CheckBox from "../../../../../components/common/inputs/CheckBox";
import { useOrderListContext } from "../../../../order/context/OrderListProvider";
import EmptyCartBox from "./EmptyCartBox";
import CartCheckItem from "./cart-check-item/CartCheckItem";
import { useAPIDataContext } from "../../../../../context/APIDataProvider";
import { getShoppingCartData } from "../../../../../api/cart";

function CartCheckList() {
  const { data: cartListData } = useAPIDataContext({
    fetcher: getShoppingCartData,
    name: "cart",
  });
  const { selectedCartItems, setSelectedCartItems } =
    useOrderListContext(cartListData);

  const isCartEmpty = !cartListData || cartListData.length === 0;

  const isSelectAll = cartListData?.length === selectedCartItems.length;

  const handleSelectAll = () => {
    if (!cartListData) return;

    if (isSelectAll) {
      setSelectedCartItems([]);
    } else {
      setSelectedCartItems([...cartListData]);
    }
  };

  return (
    <Container>
      <CheckedAll>
        <CheckBox
          isChecked={isSelectAll}
          onToggle={() => handleSelectAll()}
          role={"cart-item-all-checkbox"}
          aria-checked={isSelectAll}
        ></CheckBox>
        <p>전체 선택</p>
      </CheckedAll>
      <ItemList>
        {isCartEmpty ? (
          <EmptyCartBox />
        ) : (
          cartListData?.map((cart) => (
            <CartCheckItem key={cart.id} cart={cart} />
          ))
        )}
      </ItemList>
    </Container>
  );
}

export default CartCheckList;

const Container = styled.div`
  width: 100%;
  max-width: 480px;
`;

const ItemList = styled.div`
  height: 100%;
  max-height: 380px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 16px;
  margin-bottom: 32px;
  overflow-y: auto;
`;

const CheckedAll = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #bdbdbd;
`;
