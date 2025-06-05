import {
  Title,
  TitleContainer,
  Description,
  Subtitle,
} from "../../styles/@common/title/Title.styles";
import { ORDER_CONFIRMATION_MESSAGE } from "../../constants/systemMessages";
import { useLocation } from "react-router-dom";
import DisplayCartItem from "../../components/features/cartItem/DisplayCartItem";
import type { CartItemType } from "../../types/response";
import {
  PageWrapper,
  CartListContainer,
} from "../../styles/@common/page/Page.styles";
import Button from "../../components/@common/button/Button";
import { CheckboxContainer } from "../../styles/@common/checkBox/CheckBox.styles";
import Checkbox from "../../components/@common/checkbox/Checkbox";
import CartPrice from "../../components/features/cartPrice/CartPrice";
import { buttonFixedContainer } from "../../styles/@common/button/ButtonFixedContainer.styles";
import { useRef, useState, useEffect } from "react";
import * as S from "./OrderConfirmationPage.styles";

const OrderConfirmationPage = () => {
  const { orderItems, orderPrice, deliveryFee, totalPrice } =
    useLocation().state;

  const cartPriceRef = useRef<HTMLDivElement>(null);
  const [isCartPriceVisible, setIsCartPriceVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsCartPriceVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (cartPriceRef.current) {
      observer.observe(cartPriceRef.current);
    }
    return () => {
      if (cartPriceRef.current) {
        observer.unobserve(cartPriceRef.current);
      }
    };
  }, [cartPriceRef]);

  return (
    <div css={PageWrapper}>
      <div css={TitleContainer}>
        <p css={Title}>주문 확정</p>
        <p css={Description}>{ORDER_CONFIRMATION_MESSAGE(1, 2)}</p>
      </div>

      <div css={CartListContainer}>
        {orderItems.map((item: CartItemType) => (
          <DisplayCartItem key={item.id} cartData={item} />
        ))}
      </div>

      <Button size="large" color="white" onClick={() => {}}>
        쿠폰 적용
      </Button>

      <div css={TitleContainer}>
        <p css={Subtitle}>주문 금액</p>
        <div css={CheckboxContainer}>
          <Checkbox checked={true} onChange={() => {}} />
          <p css={Description}>제주도 및 도서 산간 지역</p>
        </div>
      </div>

      <div css={S.CartPriceContainer} ref={cartPriceRef}>
        <CartPrice
          orderPrice={orderPrice}
          deliveryFee={deliveryFee}
          totalPrice={totalPrice}
        />
      </div>

      <div css={buttonFixedContainer}>
        {isCartPriceVisible && (
          <Button size="large" color="black" onClick={() => {}}>
            주문 확정
          </Button>
        )}
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
