import { useLocation, useNavigate } from "react-router";

import { useState } from "react";

import { Modal } from "@kaori-killer/modal-component";

import Header from "../../components/common/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import Receipt from "../../components/ShoppingCart/Receipt/Receipt";
import CouponModal from "../../components/CouponModal/CouponModal";
import EmptyText from "../../components/common/EmptyText/EmptyText";
import Hr from "../../components/common/Hr/Hr";

import useCartItemList from "../../hooks/useCartItemList";

import CartItem from "../../types/CartItem";

import * as Styled from "./PaymentAmountCheck.styles";
import * as ShoppingStyled from "../ShoppingCartPage/ShoppingCartPage.styles";
import * as CartListStyled from "../../components/ShoppingCart/CartList/CartList.styles";
import * as ItemStyled from "../../components/ShoppingCart/Item/Item.styles";

import { DEFAULT_SHIPPING_FEE } from "../../constants/shipping";

import emptyIcon from "../../assets/emptyIcon.png";

export default function PaymentAmountCheckPage() {
  const [couponPrice, setCouponPrice] = useState<number>(0);
  const [isIslandArea, setIsIslandArea] = useState<boolean>(false);
  const { isOpen, handleOpen, handleClose } = Modal.useModal();
  const { cartItemList } = useCartItemList();
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state) {
    return (
      <ShoppingStyled.Container>
        <h1>잘못된 접근입니다.</h1>
        <p>주문 확인 페이지로 올바르게 접근해 주세요.</p>
      </ShoppingStyled.Container>
    );
  }

  const {
    checkedProductsLength,
    cartItemCheckListTotalQuantity,
    allProductPrice,
    shippingFee,
    checkedMap,
  } = location.state;

  const totalPrice = allProductPrice + shippingFee - (couponPrice || 0);

  const handlePayment = () => {
    navigate("/order-check", {
      state: {
        checkedProductsLength,
        cartItemCheckListTotalQuantity,
        totalPrice,
      },
    });
  };

  const handleApplyCouponPrice = (price: number) => {
    setCouponPrice(price);
  };

  function CartItemList({ cartItemList }: { cartItemList: CartItem[] }) {
    return (
      <div>
        {cartItemList
          .filter((cart) => checkedMap.get(cart.id))
          .map((cart) => (
            <div key={cart.id}>
              <Hr />
              <ItemStyled.ItemContainer>
                <ItemStyled.Image
                  src={cart.product.imageUrl}
                  alt={cart.product.name}
                  onError={(e) => (e.currentTarget.src = emptyIcon)}
                />

                <ItemStyled.InfoContainer
                  direction="column"
                  justifyContent="space-around"
                >
                  <ItemStyled.PriceContainer direction="column">
                    <ItemStyled.Name>{cart.product.name}</ItemStyled.Name>
                    <ItemStyled.Price>
                      {cart.product.price.toLocaleString()}원
                    </ItemStyled.Price>
                  </ItemStyled.PriceContainer>

                  <ItemStyled.QuantityInfo>
                    수량: {cart.quantity}개
                  </ItemStyled.QuantityInfo>
                </ItemStyled.InfoContainer>
              </ItemStyled.ItemContainer>
            </div>
          ))}

        <div>
          <CouponModal
            isOpen={isOpen}
            handleClose={handleClose}
            handleApplyCouponPrice={handleApplyCouponPrice}
            cartItemList={cartItemList.filter((cart) =>
              checkedMap.get(cart.id)
            )}
            orderAmount={allProductPrice}
            isIslandArea={isIslandArea}
          />
          <ItemStyled.Button width="382" height="48" onClick={handleOpen}>
            쿠폰 적용
          </ItemStyled.Button>
        </div>

        <div>
          <Styled.Name>배송 정보</Styled.Name>
          <CartListStyled.Checkbox>
            <CartListStyled.Input
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
          </CartListStyled.Checkbox>
        </div>

        <Receipt
          allProductPrice={allProductPrice}
          shippingFee={
            isIslandArea ? shippingFee + DEFAULT_SHIPPING_FEE : shippingFee
          }
          couponPrice={couponPrice}
          totalPrice={totalPrice}
        />
      </div>
    );
  }

  return (
    <div>
      <ShoppingStyled.Container>
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
      </ShoppingStyled.Container>

      <Footer text="결제하기" active={true} handleClick={handlePayment} />
    </div>
  );
}
