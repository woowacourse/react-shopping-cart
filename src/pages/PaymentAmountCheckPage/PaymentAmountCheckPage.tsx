import { useLocation, useNavigate } from "react-router";

import { useState } from "react";

import { Modal } from "@kaori-killer/modal-component";

import Header from "../../components/common/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import Receipt from "../../components/shoppingCart/Receipt/Receipt";
import CouponModal from "../../components/CouponModal/CouponModal";
import EmptyText from "../../components/common/EmptyText/EmptyText";

import useCartItemList from "../../hooks/useCartItemList";

import CartItem from "../../types/CartItem";

import * as Styled from "../ShoppingCartPage/ShoppingCartPage.styles";

export default function PaymentAmountCheckPage() {
  const [couponPrice] = useState<number>(0);
  const [isIslandArea, setIsIslandArea] = useState<boolean>(false);
  const { isOpen, handleOpen, handleClose } = Modal.useModal();
  const { cartItemList } = useCartItemList();
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state) {
    return (
      <Styled.Container>
        <h1>잘못된 접근입니다.</h1>
        <p>주문 확인 페이지로 올바르게 접근해 주세요.</p>
      </Styled.Container>
    );
  }

  const {
    checkedProductsLength,
    cartItemCheckListTotalQuantity,
    allProductPrice,
    shippingFee,
    checkedMap,
  } = location.state;

  const handlePayment = () => {
    navigate("/order-check", {
      state: {
        checkedProductsLength,
        cartItemCheckListTotalQuantity,
        totalPrice: 1000,
      },
    });
  };

  const handleApplyCouponPrice = () => {};

  function CartItemList({ cartItemList }: { cartItemList: CartItem[] }) {
    return (
      <div>
        {cartItemList
          .filter((cart) => checkedMap.get(cart.id))
          .map((cart) => (
            <div key={cart.id}>
              <p>{cart.product.name}</p>
              <p>{`${cart.product.price.toLocaleString()}원`}</p>
              <p>{`${cart.quantity}개`}</p>
            </div>
          ))}

        <div>
          <CouponModal
            isOpen={isOpen}
            handleClose={handleClose}
            onApplyCoupon={handleApplyCouponPrice}
          />
          <button onClick={handleOpen}>쿠폰 적용</button>
        </div>

        <div>
          <p>배송 정보</p>
          <input
            id="check-out-area-shipping-fee"
            type="checkbox"
            checked={isIslandArea}
            onChange={() => {
              setIsIslandArea(!isIslandArea);
            }}
          />
          <label htmlFor="check-out-area-shipping-fee">
            제주도 및 도서 산간 지역
          </label>
        </div>

        <Receipt
          allProductPrice={allProductPrice}
          shippingFee={shippingFee}
          couponPrice={couponPrice}
        />
      </div>
    );
  }

  return (
    <div>
      <Styled.Container>
        <Header
          title="주문 확인"
          description={`총 ${checkedProductsLength}종류의 상품 ${cartItemCheckListTotalQuantity}개를 주문합니다.
            최종 결제 금액을 확인해 주세요.`}
        />
        {cartItemList.length === 0 && (
          <EmptyText text="장바구니에 담은 상품이 없습니다." />
        )}
        {cartItemList.length > 0 && (
          <CartItemList cartItemList={cartItemList} />
        )}
      </Styled.Container>

      <Footer text="결제하기" active={false} handleClick={handlePayment} />
    </div>
  );
}
