import { useState } from "react";
import { useNavigate } from "react-router";
import Receipt from "../receipt/Receipt";
import Footer from "../../layout/Footer/Footer";
import CartItemCheck from "../../../types/CartItemCheck";
import * as S from "../../../pages/ShoppingCartPage/ShoppingCartPage.styles";
import ShoppingCartHeader from "../ShoppingCartHeader/ShoppingCartHeader";
import ShoppingCartList from "../ShoppingCartList/ShoppingCartList";
import CartItem from "../../../types/CartItem";
interface ShoppingCartContentProps {
  cartItemList: CartItem[];
  patchCartItem: (id: number, quantity: number) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
}

export default function ShoppingCartContent({
  cartItemList,
  patchCartItem,
  removeCartItem,
}: ShoppingCartContentProps) {
  const [cartItemCheckList, setCartItemCheckList] = useState<CartItemCheck[]>(
    cartItemList.map((item) => ({
      ...item,
      isClicked: true,
    }))
  );

  const handleSelectedCartItem = (id: number) => {
    setCartItemCheckList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isClicked: !item.isClicked } : item
      )
    );
  };

  const handleSelectedCartItemRemove = async (id: number) => {
    await removeCartItem(id);
    setCartItemCheckList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSelectedCartItemQuantityUpdate = async (
    id: number,
    quantity: number
  ) => {
    await patchCartItem(id, quantity);
    setCartItemCheckList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const allChecked = cartItemCheckList.every((item) => item.isClicked);
  const toggleAll = () => {
    setCartItemCheckList((prev) =>
      prev.map((item) => ({ ...item, isClicked: !allChecked }))
    );
  };

  const cartItemCheckListTotalQuantity = cartItemCheckList
    .filter((item) => item.isClicked)
    .reduce((acc, item) => acc + item.quantity, 0);

  const cartItemListLength = cartItemList.length;

  const selectedCartItemList = cartItemCheckList.filter(
    ({ isClicked }) => isClicked
  );

  const allProductPrice = selectedCartItemList.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const shippingFee = allProductPrice >= 100000 ? 0 : 3000;
  const totalPrice = allProductPrice + shippingFee;

  const navigate = useNavigate();
  const handleOrderCheckButtonClick = () => {
    navigate("/order-check", {
      state: {
        checkedProductsLength: selectedCartItemList.length,
        cartItemCheckListTotalQuantity,
        totalPrice,
      },
    });
  };

  if (!cartItemListLength) {
    return <S.EmptyText>장바구니에 담은 상품이 없습니다.</S.EmptyText>;
  }

  return (
    <>
      <ShoppingCartHeader
        title="장바구니"
        description={`현재 ${selectedCartItemList.length}종류의 상품이 담겨있습니다.`}
      />
      <ShoppingCartList
        cartItemList={cartItemList}
        cartItemCheckList={cartItemCheckList}
        allChecked={allChecked}
        toggleAll={toggleAll}
        handleSelectedCartItem={handleSelectedCartItem}
        handleSelectedCartItemQuantityUpdate={
          handleSelectedCartItemQuantityUpdate
        }
        handleSelectedCartItemRemove={handleSelectedCartItemRemove}
      />
      <Receipt allProductPrice={allProductPrice} shippingFee={shippingFee} />
      <Footer
        text="주문 확인"
        active={cartItemListLength ? "true" : "false"}
        handleClick={handleOrderCheckButtonClick}
      />
    </>
  );
}
