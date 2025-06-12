import { useCallback, useEffect, useState } from "react";
import ProductItemList from "../../components/ProductItemList/ProductItemList";
import CheckBox from "../../components/commons/CheckBox/CheckBox";
import Description from "../../components/commons/Description/Description";
import Header from "../../components/commons/Header/Header";
import Receipt from "../../components/Receipt/Receipt";
import SubmitButton from "../../components/commons/SubmitButton/SubmitButton";
import { Container, NoCartItemText, Wrap } from "./Cart.styles";
import { CartItemType } from "../../types/response";
import useFetch from "../../hooks/useFetch";
import { getCartItems } from "../../api/cartItem";
import { DEFAULT_ERROR_MESSAGE } from "../../constants/errorMessage";
import useCheckboxHandler from "../../hooks/checkbox/useCheckboxHandler";
import { useNavigate } from "react-router-dom";
import useQuantityControl from "../../hooks/useQuantityControl";
import CartItem from "../../components/CartItem/CartItem";
import { getSelectedCartItems } from "../../utils/cartItem";

function Cart() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const { fetchData } = useFetch<CartItemType[]>("cartItems");
  const {
    selectedIds: selectedCartIds,
    toggleAllSelect,
    toggleSelect,
    isAllSelected,
    isSelected,
  } = useCheckboxHandler(cartItems, "cart");
  const navigate = useNavigate();

  const updateCartItem = (cartId: number, newItem: CartItemType) => {
    setCartItems((prevItems) => {
      const targetIndex = prevItems.findIndex((item) => item.id === cartId);
      const newCartItems = [...prevItems];
      newCartItems[targetIndex] = newItem;

      return newCartItems;
    });
  };

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

  const { decreaseQuantity, increaseQuantity, deleteCartItem } =
    useQuantityControl({
      cartItems,
      updateCartItem,
      refetchCartItem: fetchCartItem,
    });

  return (
    <>
      <Header icon="logo.svg" handleIconClick={() => navigate("/")} />
      <main css={Container}>
        <Description
          title="장바구니"
          subtitle={
            cartItems.length !== 0
              ? `현재 ${cartItems.length}종류의 상품이 담겨있습니다.`
              : ""
          }
        />

        {cartItems.length === 0 ? (
          <p css={NoCartItemText}>장바구니에 담은 상품이 없습니다.</p>
        ) : (
          <div css={Wrap}>
            <CheckBox
              id="234"
              label="전체선택"
              isSelected={isAllSelected()}
              onClick={toggleAllSelect}
            />
            <ProductItemList>
              {cartItems.map((cartItem) => (
                <CartItem
                  key={cartItem.id}
                  cartItem={cartItem}
                  isSelected={isSelected(cartItem.id)}
                  toggleSelect={() => toggleSelect(cartItem.id)}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                  deleteCartItem={deleteCartItem}
                />
              ))}
            </ProductItemList>
            <Receipt
              selectedCartItems={getSelectedCartItems(
                cartItems,
                selectedCartIds
              )}
            />
          </div>
        )}
      </main>
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
