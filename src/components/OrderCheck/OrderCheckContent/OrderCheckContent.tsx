import { useState } from "react";
import { useNavigate } from "react-router";
import Receipt from "../../shoppingCart/receipt/Receipt";
import Footer from "../../layout/Footer/Footer";
import CartItemCheck from "../../../types/CartItemCheck";
import * as S from "../../../pages/ShoppingCartPage/ShoppingCartPage.styles";
import ContentHeader from "../../shoppingCart/ContentHeader/ContentHeader";
import OrderCheckList from "../OrderCheckList/OrderCheckList";
import CartItem from "../../../types/CartItem";
import Coupon from "../Coupon/Coupon";
import Shipping from "../../shoppingCart/Shipping/Shipping";
import Modal from "../Modal/Modal";

interface OrderCheckContentProps {
  cartItemList: CartItem[];
}

export default function OrderCheckContent({
  cartItemList,
}: OrderCheckContentProps) {
  const [cartItemCheckList] = useState<CartItemCheck[]>(
    cartItemList.map((item) => ({
      ...item,
      isClicked: true,
    }))
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

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
  const [couponDiscount] = useState(6000);

  const navigate = useNavigate();
  const handlePaymentButtonClick = () => {
    navigate("/payment-confirm", {
      state: {
        checkedProductsLength: selectedCartItemList.length,
        cartItemCheckListTotalQuantity,
        totalPrice: totalPrice - couponDiscount,
      },
    });
  };

  if (!cartItemListLength) {
    return <S.EmptyText>장바구니에 담은 상품이 없습니다.</S.EmptyText>;
  }

  return (
    <>
      <ContentHeader
        title="주문 확인"
        description={`현재 ${selectedCartItemList.length}종류의 상품이 담겨있습니다.\n최종 결제 금액을 확인해 주세요.`}
      />
      <OrderCheckList
        cartItemList={cartItemList}
        cartItemCheckList={cartItemCheckList}
      />
      <Coupon onClick={handleOpenModal} />
      <Modal isModalOpen={isModalOpen} onClose={handleCloseModal} />
      <Shipping />
      <Receipt
        allProductPrice={allProductPrice}
        shippingFee={shippingFee}
        couponDiscount={couponDiscount}
      />
      <Footer
        text="결제하기"
        active={cartItemListLength ? "true" : "false"}
        handleClick={handlePaymentButtonClick}
      />
    </>
  );
}
