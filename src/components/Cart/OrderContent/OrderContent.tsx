import * as Styled from "./OrderContent.style";

import AllCheckBox from "../AllCheckBox/AllCheckBox";
import CartList from "../CartList/CartList";
import CartCard from "../CartCard/CartCard";
import CartOrderSummary from "../CartOrderSummary/CartOrderSummary";
import OrderConfirmButton from "../OrderConfirmButton/OrderConfirmButton";
import { CartItem } from "../../../type/CartItem";

import useSelectedCartIds from "../../../hooks/useShoppingCart/useSelectedCartIds";
import { getSelectedCartItems } from "../../../util/cart/getSelectedCartItems";

interface OrderContentProps {
  cartItemsData: CartItem[];
  handleCartItemQuantity: (params: {
    id: number;
    quantity: number;
  }) => Promise<void>;
  handleDeleteCartItem: (id: number) => Promise<void>;
  isQuantityUpdateLoading: boolean;
  isDeleteItemLoading: boolean;
}

function OrderContent({
  cartItemsData,
  handleCartItemQuantity,
  handleDeleteCartItem,
  isQuantityUpdateLoading,
  isDeleteItemLoading,
}: OrderContentProps) {
  const {
    selectedCartIds,
    isAllSelected,
    handleRemoveSelectCartItem,
    handleAddSelectCartItem,
    handleSelectAllCartItems,
  } = useSelectedCartIds(cartItemsData);

  return (
    <>
      <Styled.OrderContentDescription>
        현재 {cartItemsData.length}종류의 상품이 담겨있습니다.
      </Styled.OrderContentDescription>
      <AllCheckBox
        isAllSelected={isAllSelected}
        handleToggleAllSelection={handleSelectAllCartItems}
      />
      <CartList>
        {cartItemsData.map((cartItem) => (
          <CartCard
            key={cartItem.id}
            cartItem={cartItem}
            handleDeleteCartItem={handleDeleteCartItem}
            isDeleteItemLoading={isDeleteItemLoading}
            isQuantityUpdateLoading={isQuantityUpdateLoading}
            handleCartItemQuantity={handleCartItemQuantity}
            handleRemoveSelectCartItem={handleRemoveSelectCartItem}
            handleAddSelectCartItem={handleAddSelectCartItem}
            isSelected={selectedCartIds.includes(cartItem.id)}
          />
        ))}
      </CartList>
      <CartOrderSummary
        selectedCartItems={getSelectedCartItems({
          cartItemsData,
          selectedCartIds,
        })}
      />
      <OrderConfirmButton
        selectedCartItems={getSelectedCartItems({
          cartItemsData,
          selectedCartIds,
        })}
      />
    </>
  );
}

export default OrderContent;
