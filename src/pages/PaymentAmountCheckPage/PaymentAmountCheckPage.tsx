import { useLocation } from "react-router";

import { useState } from "react";

import { Modal } from "@kaori-killer/modal-component";

import Header from "../../components/shoppingCart/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import Receipt from "../../components/shoppingCart/receipt/Receipt";

import useCartItemList from "../../hooks/useCartItemList";

import * as Styled from "../ShoppingCartPage/ShoppingCartPage.styles";
import CouponModal from "../../components/CouponModal/CouponModal";

export default function PaymentAmountCheckPage() {
  const [couponPrice, setCouponPrice] = useState(null);
  const [toggle, setToggle] = useState<boolean>(true);
  const { isOpen, handleOpen, handleClose } = Modal.useModal();

  const { cartItemList } = useCartItemList();
  const location = useLocation();

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

  return (
    <>
      <Styled.Container>
        <Header
          title="주문 확인"
          description={`총 ${checkedProductsLength}종류의 상품 ${cartItemCheckListTotalQuantity}개를 주문합니다.
            최종 결제 금액을 확인해 주세요.`}
        />
        {cartItemList.length ? (
          <>
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
              <CouponModal isOpen={isOpen} handleClose={handleClose} />
              <button onClick={handleOpen}>쿠폰 적용</button>
            </div>
            <div>
              <p>베송 정보</p>
              <input
                id="check-out-area-shipping-fee"
                type="checkbox"
                checked={toggle}
                onChange={() => {
                  setToggle(!toggle);
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
          </>
        ) : (
          <Styled.EmptyText>장바구니에 담은 상품이 없습니다.</Styled.EmptyText>
        )}
      </Styled.Container>
      <Footer text="결제하기" active="false" handleClick={() => {}} />
    </>
  );
}
