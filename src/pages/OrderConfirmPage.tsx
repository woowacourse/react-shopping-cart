import { css } from "@emotion/css";
import Header from "../components/@common/Header/Header";
import Text from "../components/@common/Text/Text";
import { useLocation, useNavigate } from "react-router";
import ConfirmButton from "../components/@common/Button/ConfirmButton/ConfirmButton";
import { useCartItemContext } from "../contexts/useCartItemContext";

const OrderConfirmPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useCartItemContext();

  const isInvalidAccess =
    !location.state ||
    !location.state.selectedItemCount ||
    !location.state.totalPrice ||
    !location.state.selectedItemIds;

  if (isInvalidAccess) {
    return (
      <div className={OrderConfirmPageStyles}>
        <Header
          leading="./back-icon.svg"
          onLeadingClick={() => {
            navigate("/");
          }}
        />
        <section className={ContentStyle}>
          <Text text="잘못된 접근입니다" type="large" />
          <Text text="장바구니에서 다시 주문해 주세요." />
        </section>
        <ConfirmButton text="장바구니로 이동" onClick={() => navigate("/")} />
      </div>
    );
  }

  const { selectedItemCount, totalPrice, selectedItemIds } = location.state;

  const selectedItems = cartItems.filter((item) =>
    selectedItemIds.includes(item.id)
  );
  const totalQuantity = selectedItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

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
            <Text
              text={`총 ${selectedItemCount}종류의 상품 ${totalQuantity}개를 주문합니다.`}
            />
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
