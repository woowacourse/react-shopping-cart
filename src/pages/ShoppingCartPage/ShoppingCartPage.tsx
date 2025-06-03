import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import ShoppingCartList from "../../components/shoppingCart/ShoppingCartList/ShoppingCartList";
import Header from "../../components/shoppingCart/Header/Header";
import Receipt from "../../components/shoppingCart/receipt/Receipt";
import Footer from "../../components/layout/Footer/Footer";
import ErrorBox from "../../components/common/ErrorBox/ErrorBox";

import useCartItemList from "../../hooks/useCartItemList";
import { useErrorContext } from "../../contexts/ErrorContext";

import { CheckedMap } from "../../types/CheckMap";

import * as Styled from "./ShoppingCartPage.styles";

export default function ShoppingCartPage() {
  const { state, cartItemList } = useCartItemList();
  const [checkedMap, setCheckedMap] = useState<CheckedMap>(new Map());
  const { errorMessage } = useErrorContext();
  const navigate = useNavigate();

  useEffect(() => {
    setCheckedMap((prevMap) => {
      const newMap = new Map<number, boolean>();
      cartItemList.forEach((item) => {
        const prev = prevMap.get(item.id);
        newMap.set(item.id, prev ?? true);
      });
      return newMap;
    });
  }, [cartItemList]);

  const handleSelectedCartItem = (id: number) => {
    setCheckedMap((prevMap) => {
      const newMap = new Map(prevMap);
      const prev = newMap.get(id) ?? true;
      newMap.set(id, !prev);
      return newMap;
    });
  };

  const allChecked =
    cartItemList.length > 0 &&
    cartItemList.every((item) => checkedMap.get(item.id) ?? true);

  const toggleAll = () => {
    setCheckedMap((prevMap) => {
      const newMap = new Map(prevMap);
      cartItemList.forEach((item) => {
        newMap.set(item.id, !allChecked);
      });
      return newMap;
    });
  };

  const checkedProductsLength = cartItemList.filter((item) =>
    checkedMap.get(item.id)
  ).length;

  const cartItemCheckListTotalQuantity = cartItemList.reduce((acc, item) => {
    return checkedMap.get(item.id) ? acc + item.quantity : acc;
  }, 0);

  const allProductPrice = cartItemList.reduce((acc, item) => {
    return checkedMap.get(item.id)
      ? acc + item.product.price * item.quantity
      : acc;
  }, 0);

  const shippingFee = allProductPrice >= 100000 ? 0 : 3000;
  const totalPrice = allProductPrice + shippingFee;

  const handleOrderCheckButtonClick = () => {
    navigate("/order-check", {
      state: {
        checkedProductsLength,
        cartItemCheckListTotalQuantity,
        totalPrice,
      },
    });
  };

  if (state.isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <Styled.ShoppingCart>
        {errorMessage && <ErrorBox />}
        <Header
          title="장바구니"
          description={
            cartItemList.length
              ? `현재 ${checkedProductsLength}종류의 상품이 담겨있습니다.`
              : ""
          }
        />
        {cartItemList.length ? (
          <>
            <ShoppingCartList
              cartItemList={cartItemList}
              checkedMap={checkedMap}
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
          <Styled.EmptyText>장바구니에 담은 상품이 없습니다.</Styled.EmptyText>
        )}
      </Styled.ShoppingCart>
      <Footer
        text="주문 확인"
        active={cartItemList.length ? "true" : "false"}
        handleClick={handleOrderCheckButtonClick}
      />
    </>
  );
}
