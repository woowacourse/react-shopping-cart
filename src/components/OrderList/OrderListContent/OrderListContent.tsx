import { useState } from "react";
import { useNavigate } from "react-router";
import { useCouponListContext } from "../../../contexts/CouponContext";
import { useReceipt } from "../../../hooks/useReceipt";
import * as S from "../../../pages/ShoppingCartPage/ShoppingCartPage.styles";
import CartItem from "../../../types/CartItem";
import Footer from "../../layout/Footer/Footer";
import ContentHeader from "../../shoppingCart/ContentHeader/ContentHeader";
import Receipt from "../../shoppingCart/receipt/Receipt";
import CouponButton from "../Coupon/Button/CouponButton";
import Modal from "../Modal/Modal";
import OrderList from "../OrderList/OrderList";
import Shipping from "../Shipping/Shipping";
interface OrderListContentProps {
  cartItemList: CartItem[];
}

export default function OrderListContent({
  cartItemList,
}: OrderListContentProps) {
  const {
    selectedItems,
    isRemote,
    setIsRemote,
    cartItemCheckListTotalQuantity,
    allProductPrice,
    shippingFee,
    calculateDiscounts,
  } = useReceipt();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { checkedCoupons } = useCouponListContext();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const totalCouponDiscount = calculateDiscounts(checkedCoupons);

  const totalPrice = allProductPrice + shippingFee - totalCouponDiscount;

  const navigate = useNavigate();
  const handlePaymentButtonClick = () => {
    navigate("/payment-confirm", {
      state: {
        checkedProductsLength: selectedItems.length,
        cartItemCheckListTotalQuantity,
        totalPrice: totalPrice,
      },
    });
  };

  if (!cartItemList.length) {
    return <S.EmptyText>장바구니에 담은 상품이 없습니다.</S.EmptyText>;
  }

  return (
    <>
      <ContentHeader
        title="주문 확인"
        description={`총 ${selectedItems.length}종류의 상품 ${cartItemCheckListTotalQuantity}개를 주문합니다.\n최종 결제 금액을 확인해 주세요.`}
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
        couponDiscount={totalCouponDiscount}
      />
      <Footer
        text="결제하기"
        active={cartItemList.length ? "true" : "false"}
        handleClick={handlePaymentButtonClick}
      />
    </>
  );
}
