import { useCallback, useEffect, useState } from "react";
import CartItemList from "../../components/CartItemList/CartItemList";
import CheckBox from "../../components/CheckBox/CheckBox";
import Description from "../../components/Description/Description";
import Header from "../../components/Header/Header";
import Receipt from "../../components/Receipt/Receipt";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { Container } from "../../styles";
import { CartItemType } from "../../types/response";
import useFetch from "../../hooks/common/useFetch";
import { getCartItems } from "../../api/cartItem";
import { DEFAULT_ERROR_MESSAGE } from "../../constants/errorMessage";
import useCheckboxHandler from "../../hooks/cart/useCheckboxHandler";
import { useNavigate } from "react-router-dom";
import { CartLogo } from "../../constants/images";
import { NoCartItemText, Wrap } from "./Cart.styles";
import { getDeliveryCost, getOrderCost } from "../../\bdomains/cost";

const getSelectedCartItems = (
  cartItems: CartItemType[],
  selectedCartIds: number[]
) => {
  return cartItems.filter((cartItem) => selectedCartIds.includes(cartItem.id));
};

function Cart() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const { fetchData } = useFetch<CartItemType[]>();
  const {
    selectedCartIds,
    toggleAllSelect,
    toggleSelect,
    isAllSelected,
    isSelected,
  } = useCheckboxHandler(cartItems);
  const navigate = useNavigate();

  const fetchCartItem = useCallback(
    () =>
      fetchData({
        apiCall: getCartItems,
        onSuccess: (data) => {
          if (data) {
            setCartItems(data);
          }
        },
        onError: (error) => {
          const errorMessage =
            error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE;
          alert(errorMessage);
        },
      }),
    [fetchData]
  );

  useEffect(() => {
    fetchCartItem();
  }, [fetchCartItem]);

  const subTitle =
    cartItems.length !== 0
      ? `현재 ${cartItems.length}종류의 상품이 담겨있습니다.`
      : "";

  const selectedCartItems = getSelectedCartItems(cartItems, selectedCartIds);
  const orderCost = getOrderCost(selectedCartItems);
  const deliveryCost = getDeliveryCost(orderCost);

  console.log(cartItems);

  return (
    <>
      <Header icon={CartLogo} handleIconClick={() => navigate("/")} />
      <section css={Container}>
        <Description title="장바구니" subTitle={subTitle} />

        {cartItems.length === 0 ? (
          <p css={NoCartItemText}>장바구니에 담은 상품이 없습니다.</p>
        ) : (
          <div css={Wrap}>
            <CheckBox
              id="allCheckBox"
              label="전체선택"
              isSelected={isAllSelected()}
              onClick={toggleAllSelect}
            />
            <CartItemList
              fetchCartItem={fetchCartItem}
              cartItems={cartItems}
              isSelected={isSelected}
              toggleSelect={toggleSelect}
            />
            <Receipt deliveryCost={deliveryCost} orderCost={orderCost} />
          </div>
        )}
      </section>
      <SubmitButton
        label="주문 확인"
        enabled={selectedCartIds.length !== 0}
        onClick={() =>
          navigate("/summary", {
            state: getSelectedCartItems(cartItems, selectedCartIds),
          })
        }
      />
    </>
  );
}

export default Cart;
