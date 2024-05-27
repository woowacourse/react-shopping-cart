import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import CartTitle from "../components/CartPage/CartTitle";
import CartItems from "../components/CartPage/CartItems";
import OrderSummary from "../components/CartPage/OrderSummary";
import EmptyCart from "../components/CartPage/EmptyCart";
import CartLayout from "../components/layout";

import { isVacantCartSelector } from "../recoil/cart/cartItemState";
import { checkedIdSetSelector } from "../recoil/cart/checkedState";
import CouponModal from "../components/CouponModal";
import { useModalState } from "lv2-modal-component";

const CartPage = () => {
  const navigate = useNavigate();
  const isCartVacant = useRecoilValue(isVacantCartSelector);
  const cartItemCheckedIds = useRecoilValue(checkedIdSetSelector);

  const handleClick = () => {
    navigate("/orderConfirmation");
  };

  const { isOpen, closeModal, openModal, confirmModal } = useModalState(false, {
    onOpen: () => {},
    onConfirm: () => {},
  });

  return (
    <>
      <CartLayout>
        <CartLayout.Header>SHOP</CartLayout.Header>
        <CartLayout.Content>
          <CartTitle />
          {!isCartVacant ? (
            <>
              <CartItems />
              <button onClick={openModal}>쿠폰 적용</button>
              <OrderSummary />
            </>
          ) : (
            <EmptyCart />
          )}
        </CartLayout.Content>
        <CartLayout.Footer text="주문 확인" isActive={cartItemCheckedIds.size > 0} onClick={handleClick} />
      </CartLayout>
      <CouponModal isOpen={isOpen} closeModal={closeModal} confirmModal={confirmModal} />
    </>
  );
};

export default CartPage;
