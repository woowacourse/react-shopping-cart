import { css } from "@emotion/css";
import Header from "../components/@common/Header/Header";
import Text from "../components/@common/Text/Text";
import { useLocation, useNavigate } from "react-router";
import ConfirmButton from "../components/@common/Button/ConfirmButton/ConfirmButton";
import { useEffect } from "react";

const OrderConfirmPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !location.state ||
      !location.state.selectedItemCount ||
      !location.state.totalPrice
    ) {
      navigate("/", { replace: true });
    }
  }, [location.state, navigate]);

  if (
    !location.state ||
    !location.state.selectedItemCount ||
    !location.state.totalPrice
  ) {
    return null;
  }

  const { selectedItemCount, totalPrice } = location.state;

  return (
    <>
      <div className={OrderConfirmPageStyles}>
        <Header
          leading="./back-icon.svg"
          onLeadingClick={() => {
            navigate("/");
          }}
        />
        <section className={ContentStyle}>
          <Text text="주문 확인" type="large" />
          <section className={Description}>
            <Text text={`총 ${selectedItemCount}개의 상품을 주문합니다.`} />
            <Text text="최종 결제 금액을 확인해 주세요." />
          </section>
          <Text text="총 결제 금액" type="medium" />
          <Text text={`${totalPrice.toLocaleString()}원`} type="large" />
        </section>
      </div>
      <ConfirmButton text="주문하기" onClick={() => {}} disabled={true} />
    </>
  );
};

export default OrderConfirmPage;

const OrderConfirmPageStyles = css`
  min-height: 100dvh;
  background-color: #ffffff;
`;

const ContentStyle = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 128px);
`;

const Description = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;
