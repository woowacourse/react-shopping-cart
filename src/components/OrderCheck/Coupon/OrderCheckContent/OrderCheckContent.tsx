import { useState } from "react";
import { useNavigate } from "react-router";
import Receipt from "../../../shoppingCart/receipt/Receipt";
import Footer from "../../../layout/Footer/Footer";
import CartItemCheck from "../../../../types/CartItemCheck";
import * as S from "../../../../pages/ShoppingCartPage/ShoppingCartPage.styles";
import ShoppingCartHeader from "../../../shoppingCart/ShoppingCartHeader/ShoppingCartHeader";
import ShoppingCartList from "../../../shoppingCart/ShoppingCartList/ShoppingCartList";
import CartItem from "../../../../types/CartItem";
import Coupon from "../Coupon";
import Shipping from "../../../shoppingCart/Shipping/Shipping";
import Modal from "../Modal/Modal";

interface OrderCheckContentProps {
  cartItemList: CartItem[];
  patchCartItem: (id: number, quantity: number) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
}

export default function OrderCheckContent({
  cartItemList,
  patchCartItem,
  removeCartItem,
}: OrderCheckContentProps) {
  const [cartItemCheckList, setCartItemCheckList] = useState<CartItemCheck[]>(
    cartItemList.map((item) => ({
      ...item,
      isClicked: true,
    }))
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

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
  const handlePaymentButtonClick = () => {
    navigate("/payment-confirm", {
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
        title="주문 확인"
        description={`현재 ${selectedCartItemList.length}종류의 상품이 담겨있습니다.\n최종 결제 금액을 확인해 주세요.`}
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
      <Coupon onClick={handleOpenModal} />
      <Modal isModalOpen={isModalOpen} onClose={handleCloseModal} />
      <Shipping />
      <Receipt allProductPrice={allProductPrice} shippingFee={shippingFee} />
      <Footer
        text="결제하기"
        active={cartItemListLength ? "true" : "false"}
        handleClick={handlePaymentButtonClick}
      />
    </>
  );
}
