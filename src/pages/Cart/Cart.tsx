import { useCallback, useEffect, useState } from "react";
import CartItemList from "../../components/CartItemList/CartItemList";
import CheckBox from "../../components/CheckBox/CheckBox";
import Description from "../../components/Description/Description";
import Header from "../../components/Header/Header";
import Receipt from "../../components/Receipt/Receipt";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { Container, NoCartItemText } from "./Cart.styles";
import { CartItemType } from "../../types/response";
import useFetch from "../../hooks/useFetch";
import { getCartItems } from "../../api/cartItem";
import { DEFAULT_ERROR_MESSAGE } from "../../constants/errorMessage";

function Cart() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const { fetchData } = useFetch<CartItemType[]>();

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

  return (
    <>
      <Header icon="/public/logo.svg" handleIconClick={() => alert("클릭")} />
      <section css={Container}>
        <Description cartItemCount={cartItems.length} />

        {cartItems.length === 0 ? (
          <p css={NoCartItemText}>장바구니에 담은 상품이 없습니다.</p>
        ) : (
          <div>
            <CheckBox id="234" label="전체선택" isSelected={true} />
            <CartItemList fetchCartItem={fetchCartItem} cartItems={cartItems} />
            <Receipt />
          </div>
        )}
      </section>
      <SubmitButton label="주문 확인" enabled={true} />
    </>
  );
}

export default Cart;
