import { useState } from "react";
import { useNavigate } from "react-router";
import Receipt from "../../shoppingCart/receipt/Receipt";
import Footer from "../../layout/Footer/Footer";
import CartItemCheck from "../../../types/CartItemCheck";
import ContentHeader from "../../shoppingCart/ContentHeader/ContentHeader";
import OrderList from "../OrderList/OrderList";
import CartItem from "../../../types/CartItem";
import CouponButton from "../Coupon/Button/CouponButton";
import Shipping from "../Shipping/Shipping";
import Modal from "../Modal/Modal";
import * as S from "../../../pages/ShoppingCartPage/ShoppingCartPage.styles";
import useLocalStorage from "../../../hooks/useLocalStorage";
interface OrderListContentProps {
  cartItemList: CartItem[];
}

export default function OrderListContent({
  cartItemList,
}: OrderListContentProps) {
  const [selectedItems] = useLocalStorage<CartItemCheck[]>(
    "selectedCartItems",
    []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRemote, setIsRemote] = useLocalStorage<boolean>("isRemote", false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const cartItemCheckListTotalQuantity = selectedItems
    .filter((item) => item.isClicked)
    .reduce((acc, item) => acc + item.quantity, 0);

  const cartItemListLength = cartItemList.length;

  const selectedCartItemList = selectedItems.filter(
    ({ isClicked }) => isClicked
  );

  const allProductPrice = selectedCartItemList.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const baseShippingFee = allProductPrice >= 100000 ? 0 : 3000;
  const shippingFee = baseShippingFee + (isRemote ? 3_000 : 0);

  const [couponDiscount] = useState(6_000);

  const totalPrice = allProductPrice + shippingFee - couponDiscount;

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
        description={`총 ${selectedCartItemList.length}종류의 상품 ${cartItemCheckListTotalQuantity}개를 주문합니다.\n최종 결제 금액을 확인해 주세요.`}
      />
      <OrderList items={selectedItems} />
      <CouponButton onClick={handleOpenModal} />
      <Modal isModalOpen={isModalOpen} onClose={handleCloseModal} />
      <Shipping
        isRemote={isRemote}
        onRemoteChange={(checked) => setIsRemote(checked)}
      />
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
