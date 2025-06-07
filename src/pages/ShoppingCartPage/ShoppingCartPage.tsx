import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import Header from "../../components/common/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import ErrorBox from "../../components/common/ErrorBox/ErrorBox";
import EmptyText from "../../components/common/EmptyText/EmptyText";
import CartList from "../../components/shoppingCart/CartList/CartList";

import useCartItemList from "../../hooks/useCartItemList";

import { useErrorContext } from "../../contexts/ErrorContext";

import { CheckedMap } from "../../types/CheckMap";

import * as Styled from "./ShoppingCartPage.styles";
import { isAllChecked } from "../../utils/isAllChecked";
import { getCheckedProductsLength } from "../../utils/getCheckedProductsLength";
import { getCheckedProductsTotalPrice } from "../../utils/getCheckedProductsTotalPrice";
import { getShippingFee } from "../../utils/getShippingFee";

export default function ShoppingCartPage() {
  const { state, cartItemList } = useCartItemList();
  const [checkedMap, setCheckedMap] = useState<CheckedMap>(new Map());
  const { errorMessage } = useErrorContext();
  const navigate = useNavigate();

  const allChecked = isAllChecked(cartItemList, checkedMap);
  const checkedProductsLength = getCheckedProductsLength(
    cartItemList,
    checkedMap
  );
  const allProductPrice = getCheckedProductsTotalPrice(
    cartItemList,
    checkedMap
  );
  const shippingFee = getShippingFee(allProductPrice);
  const toggleAll = () => {
    setCheckedMap((prevMap) => {
      const newMap = new Map(prevMap);
      cartItemList.forEach((item) => {
        newMap.set(item.id, !allChecked);
      });
      return newMap;
    });
  };

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

  const handleOrderCheckButtonClick = () => {
    const cartItemCheckListTotalQuantity = cartItemList.reduce((acc, item) => {
      return checkedMap.get(item.id) ? acc + item.quantity : acc;
    }, 0);

    navigate("/payment-amount-check", {
      state: {
        checkedProductsLength,
        cartItemCheckListTotalQuantity,
        allProductPrice,
        shippingFee,
        cartItemList,
        checkedMap,
      },
    });
  };

  const isCartEmpty = cartItemList.length === 0;

  if (state.isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <Styled.Container>
        {errorMessage && <ErrorBox />}
        <Header
          title="장바구니"
          description={
            !isCartEmpty
              ? `현재 ${checkedProductsLength}종류의 상품이 담겨있습니다.`
              : ""
          }
        />
        {isCartEmpty ? (
          <EmptyText text="장바구니에 담은 상품이 없습니다." />
        ) : (
          <CartList
            cartItemList={cartItemList}
            checkedMap={checkedMap}
            allChecked={allChecked}
            toggleAll={toggleAll}
            handleSelectedCartItem={handleSelectedCartItem}
          />
        )}
      </Styled.Container>
      <Footer
        text="주문 확인"
        active={!isCartEmpty}
        handleClick={handleOrderCheckButtonClick}
      />
    </div>
  );
}
