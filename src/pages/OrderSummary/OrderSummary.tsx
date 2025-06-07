import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { Container } from "../../styles";
import { CartItemType } from "../../types/response";
import { BackIcon } from "../../constants/images";
import useSafeLocationState from "../../hooks/common/\buseSafeLocation";
import Description from "../../components/Description/Description";
import OrderItemList from "../../components/OrderItemList/OrderItemList";
import CouponButton from "../../components/CouponButton/CouponButton";
import CheckBox from "../../components/CheckBox/CheckBox";
import Receipt from "../../components/Receipt/Receipt";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import CouponModal from "../../components/CouponModal/CouponModal";
import useModal from "../../hooks/modal/useModal";

function OrderSummary() {
  const { isOpen, modalClose, modalOpen } = useModal();
  const navigate = useNavigate();

  const cartItems = useSafeLocationState<CartItemType[]>();

  // const orderCost = getOrderCost(cartItems);
  // const totalCost = orderCost + getDeliveryCost(orderCost);

  return (
    <>
      <Header icon={BackIcon} handleIconClick={() => navigate(-1)} />
      <section css={Container}>
        <Description
          title="주문 확인"
          subTitle={`총 ${cartItems.length}종류의 상품 ${getAllQuantity(
            cartItems
          )}개를 주문합니다.\n
최종 결제 금액을 확인해 주세요.
          `}
        />
        <OrderItemList />
        <CouponButton onClick={modalOpen} />
        <div>
          <p>배송 정보</p>
          <CheckBox
            id="delivery"
            isSelected={true}
            onClick={() => console.log("클릭")}
            label="제주도 및 도서 산간 지역"
          />
        </div>
        <Receipt selectedCartItems={[]} discount={10000} />
      </section>
      <SubmitButton enabled={false} label="결제하기" />
      {isOpen && <CouponModal onClose={modalClose} />}
    </>
  );
}
export default OrderSummary;

function getAllQuantity(cartItems: CartItemType[]) {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
}
