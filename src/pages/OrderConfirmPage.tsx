import { css } from "@emotion/css";
import { FREE_SHIPPING_MIN_AMOUNT } from "../constants";
import PriceRow from "../components/PriceRow/PriceRow";
import Text from "../components/@common/Text/Text";
import Header from "../components/@common/Header/Header";
import ConfirmButton from "../components/@common/Button/ConfirmButton/ConfirmButton";
import { useNavigate } from "react-router";
import PageTitle from "../components/@common/PageTitle/PageTitle";
import FullWidthButton from "../components/@common/Button/FullWidthButton/FullWidthButton";
import LabeledCheckbox from "../components/@common/LabeledCheckbox/LabeledCheckbox";

const OrderConfirmPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header onLeadingClick={() => navigate("/")} />
      <div className={CartItemPageStyles}>
        <PageTitle
          title="주문 확인"
          description={`총 ${1}종류의 상품 ${2}개를 주문합니다.\n최종 결제 금액을 확인해 주세요.`}
        />
        <FullWidthButton text="쿠폰 적용" onClick={() => {}} />
        <div className={ShippingInfo}>
          <Text text="배송 정보" type="medium" />
          <LabeledCheckbox
            labelText="제주도 및 도서 산간 지역"
            isSelected={true}
            onClick={() => {}}
          />
        </div>
        <div className={InfoRow}>
          <img src="./info-icon.svg" alt="info" />
          <Text
            text={`총 주문 금액이 ${FREE_SHIPPING_MIN_AMOUNT.toLocaleString()}원 이상일 경우 무료 배송됩니다.`}
          />
        </div>

        <hr className={Divider} />
        <PriceRow title="주문 금액" price={7000} testId="order-price" />
        <PriceRow title="쿠폰 할인 금액" price={-6000} />
        <PriceRow title="배송비" price={1000} testId="shipping-fee" />
        <hr className={Divider} />
        <PriceRow title="총 결제 금액" price={3000} />
      </div>
      <ConfirmButton text="결제하기" onClick={() => {}} />
    </>
  );
};

export default OrderConfirmPage;

const CartItemPageStyles = css`
  padding: 24px;
  min-height: calc(100vh - 128px);
  justify-content: center;
  background-color: #ffffff;
`;

const Divider = css`
  border: 0.5px solid #e0e0e0;
`;

const InfoRow = css`
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 13px 0;
`;

const ShippingInfo = css`
  margin: 28px 0;
`;
