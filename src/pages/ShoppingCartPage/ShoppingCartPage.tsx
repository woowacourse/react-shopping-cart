import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import Header from "../../components/layout/Header/Header";
import ShoppingCartHeader from "../../components/shoppingCart/ShoppingCartHeader/ShoppingCartHeader";
import Receipt from "../../components/shoppingCart/receipt/Receipt";
import Footer from "../../components/layout/Footer/Footer";
import ErrorBox from "../../components/common/ErrorBox/ErrorBox";

import useCartItemList from "../../hooks/useCartItemList";

import CartItemCheck from "../../types/CartItemCheck";

import { StyledShoppingCart, EmptyText } from "./ShoppingCartPage.styles";
import { useErrorContext } from "../../contexts/ErrorContext";
import ShoppingCartList from "../../components/shoppingCart/ShoppingCartList/ShoppingCartList";

export default function ShoppingCartPage() {
  const { state, cartItemList } = useCartItemList();
  const [cartItemCheckList, setCartItemCheckList] = useState<CartItemCheck[]>(
    []
  );
  const { errorMessage } = useErrorContext();

  useEffect(() => {
    setCartItemCheckList(
      cartItemList.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        price: item.product.price,
        isClicked: true,
      }))
    );
  }, [state.isLoading]);

  useEffect(() => {
    setCartItemCheckList((prev) =>
      cartItemList.map((item) => {
        const prevItem = prev.find((p) => p.id === item.id);
        return {
          id: item.id,
          quantity: item.quantity,
          price: item.product.price,
          isClicked: prevItem?.isClicked ?? true,
        };
      })
    );
  }, [cartItemList]);

  const handleSelectedCartItem = (id: number) => {
    setCartItemCheckList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isClicked: !item.isClicked } : item
      )
    );
  };

  const allChecked = cartItemCheckList.every((item) => item.isClicked);

  const toggleAll = () => {
    setCartItemCheckList((prev) =>
      prev.map((item) => ({ ...item, isClicked: !allChecked }))
    );
  };

  const checkedProductsLength = cartItemCheckList.filter(
    (item) => item.isClicked
  ).length;

  const cartItemCheckListTotalQuantity = cartItemCheckList
    .filter((item) => item.isClicked)
    .reduce((acc, item) => acc + item.quantity, 0);

  const cartItemListLength = cartItemList.length;

  const selectedCartItemList = cartItemCheckList.filter(
    (item) => item.isClicked === true
  );
  const allProductPrice = selectedCartItemList.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingFee = allProductPrice >= 100000 ? 0 : 3000;
  const totalPrice = allProductPrice + shippingFee;

  const navigate = useNavigate();
  const handleOrderCheckButtonClick = () => {
    navigate("/order-check", {
      state: {
        checkedProductsLength,
        cartItemCheckListTotalQuantity,
        totalPrice,
      },
    });
  };

  return (
    <>
      <Header>SHOP</Header>
      <StyledShoppingCart>
        {errorMessage && <ErrorBox />}
        <ShoppingCartHeader
          title="장바구니"
          description={
            cartItemListLength
              ? `현재 ${checkedProductsLength}종류의 상품이 담겨있습니다.`
              : ""
          }
        />
        {cartItemListLength ? (
          <>
            <ShoppingCartList
              cartItemList={cartItemList}
              cartItemCheckList={cartItemCheckList}
              allChecked={allChecked}
              toggleAll={toggleAll}
              handleSelectedCartItem={handleSelectedCartItem}
            />
            <Receipt
              allProductPrice={allProductPrice}
              shippingFee={shippingFee}
            />
          </>
        ) : (
          <EmptyText>장바구니에 담은 상품이 없습니다.</EmptyText>
        )}
      </StyledShoppingCart>
      <Footer
        text="주문 확인"
        active={cartItemListLength ? "true" : "false"}
        handleClick={handleOrderCheckButtonClick}
      />
    </>
  );
}
