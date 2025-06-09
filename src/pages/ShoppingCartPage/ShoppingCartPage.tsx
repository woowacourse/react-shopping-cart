import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import Header from "../../components/common/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import ErrorBox from "../../components/common/ErrorBox/ErrorBox";
import EmptyText from "../../components/common/EmptyText/EmptyText";
import CartList from "../../components/ShoppingCart/CartList/CartList";
import Receipt from "../../components/ShoppingCart/Receipt/Receipt";

import { useErrorContext } from "../../contexts/ErrorContext";

import useCartItemList from "../../hooks/useCartItemList";

import { isAllChecked } from "../../utils/isAllChecked";
import { getCheckedProductsLength } from "../../utils/getCheckedProductsLength";
import { getCheckedProductsTotalPrice } from "../../utils/getCheckedProductsTotalPrice";
import { getShippingFee } from "../../utils/getShippingFee";
import {
  saveCheckedMapToStorage,
  loadCheckedMapFromStorage,
} from "../../utils/localStorageCheckedMap";

import { CheckedMap } from "../../types/CheckMap";

import * as Styled from "./ShoppingCartPage.styles";

import { DEFAULT_URL } from "../../router";

export default function ShoppingCartPage() {
  const { state, cartItemList } = useCartItemList();
  const [checkedMap, setCheckedMap] = useState<CheckedMap>(
    loadCheckedMapFromStorage
  );

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
      saveCheckedMapToStorage(newMap);
      return newMap;
    });
  };

  useEffect(() => {
    setCheckedMap((prevMap) => {
      const newMap = new Map(prevMap);
      cartItemList.forEach((item) => {
        if (!newMap.has(item.id)) {
          newMap.set(item.id, true);
        }
      });
      saveCheckedMapToStorage(newMap);
      return newMap;
    });
  }, [cartItemList]);

  if (state.isLoading) {
    return <div>로딩 중...</div>;
  }

  const handleSelectedCartItem = (id: number) => {
    setCheckedMap((prevMap) => {
      const newMap = new Map(prevMap);
      const prev = newMap.get(id) ?? true;
      newMap.set(id, !prev);
      saveCheckedMapToStorage(newMap);
      return newMap;
    });
  };

  const handleOrderCheckButtonClick = () => {
    const cartItemCheckListTotalQuantity = cartItemList.reduce((acc, item) => {
      return checkedMap.get(item.id) ? acc + item.quantity : acc;
    }, 0);

    navigate(`${DEFAULT_URL}/payment-amount-check`, {
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
          <>
            <CartList
              cartItemList={cartItemList}
              checkedMap={checkedMap}
              allChecked={allChecked}
              toggleAll={toggleAll}
              handleSelectedCartItem={handleSelectedCartItem}
            />
            <Receipt
              allProductPrice={allProductPrice}
              shippingFee={shippingFee}
              totalPrice={allProductPrice + shippingFee}
            />
          </>
        )}
      </Styled.Container>

      <Footer
        text="주문 확인"
        active={!!checkedProductsLength}
        handleClick={handleOrderCheckButtonClick}
      />
    </div>
  );
}
