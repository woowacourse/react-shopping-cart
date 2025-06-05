import { css } from "@emotion/css";
import Header from "../components/@common/Header/Header";
import Text from "../components/@common/Text/Text";
import { useCartItemContext } from "../contexts/useCartItemContext";
import { useNavigate } from "react-router";
import ConfirmButton from "../components/@common/Button/ConfirmButton/ConfirmButton";

const PaymentConfirmPage = () => {
  const { selectedItemIds, totalPrice } = useCartItemContext();
  const navigate = useNavigate();

  return (
    <>
      <div className={PaymentConfirmPageStyles}>
        <Header
          leadingIcon="./back-icon.svg"
          onLeadingClick={() => {
            navigate("/");
          }}
        />
        <section className={ContentStyle}>
          <Text text="결제 확인" type="large" />
          <section className={Description}>
            <Text
              text={`총 ${selectedItemIds.size}개의 상품을 주문했습니다.`}
            />
            <Text text="최종 결제 금액을 확인해 주세요." />
          </section>
          <Text text="총 결제 금액" type="medium" />
          <Text text={`${totalPrice.toLocaleString()}원`} type="large" />
        </section>
        <ConfirmButton text="주문하기" onClick={() => {}} disabled={true} />
      </div>
    </>
  );
};

export default PaymentConfirmPage;

const PaymentConfirmPageStyles = css`
  min-height: 100dvh;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const ContentStyle = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const Description = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;
