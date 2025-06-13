import { css } from "@emotion/css";
import Header from "../components/@common/Header/Header";
import Text from "../components/@common/Text/Text";
import { useNavigate } from "react-router";
import ConfirmButton from "../components/@common/Button/ConfirmButton/ConfirmButton";
import { useCartSummary } from "../hooks/useCartSummary";
import { useSelectedItems } from "../hooks/useSelectedItems";
import InvalidAccessPage from "./InvalidAccessPage";

const PaymentConfirmPage = () => {
  const navigate = useNavigate();
  const { totalQuantity, selectedItemCount } = useSelectedItems();
  const { totalPrice } = useCartSummary();

  const isInvalidAccess = selectedItemCount === 0;

  if (isInvalidAccess) {
    return <InvalidAccessPage />;
  }

  return (
    <>
      <div className={OrderConfirmPageStyles}>
        <Header
          leading=""
          onLeadingClick={() => {
            navigate("/");
          }}
        />
        <section className={ContentStyle}>
          <Text text="결제 확인" type="large" />
          <section className={Description}>
            <Text
              text={`총 ${selectedItemCount}종류의 상품 ${totalQuantity}개를 주문합니다.`}
            />
            <Text text="최종 결제 금액을 확인해 주세요." />
          </section>
          <Text text="총 결제 금액" type="medium" />
          <Text text={`${totalPrice.toLocaleString()}원`} type="large" />
        </section>
      </div>
      <ConfirmButton text="장바구니로 돌아가기" onClick={() => navigate("/")} />
    </>
  );
};

export default PaymentConfirmPage;

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
  min-height: calc(100vh - 64px);
`;

const Description = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;
