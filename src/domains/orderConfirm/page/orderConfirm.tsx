import Button from "../../../components/Button/Button";
import { Footer } from "../../../layout/Footer/Footer";
import Header from "../../../layout/Header/Header";
import Main from "../../../layout/Main/Main";
import { PageLayout } from "../../../layout/PageLayout/PageLayout";
import { subTitleStyle, titleBox, titleStyle } from "../../common/common.style";
import { useCartContext } from "../../common/context/cartProvider";
import { PaymentSummary } from "../../shopping-cart/components/PaymentSummary/PaymentSummary";
import { getTotalPrice } from "../../shopping-cart/utils/getTotalPrice/getTotalPrice";
import { SelectedCartContainer } from "../component/SelectedCartContainer/SelectedCartContainer";
import { SelectedCartList } from "../component/SelectedCartList/SelectedCartList";

export default function OrderConfirm() {
  const { cartItems } = useCartContext();

  const totalPrice = getTotalPrice({
    cartItems: cartItems,
    selectedCartIds: ["14018"],
  });

  return (
    <PageLayout>
      <Header>
        <img src="./arrowBack.png" alt="뒤로가기" />
      </Header>
      <Main>
        <div css={titleBox}>
          <p css={titleStyle}>주문 확인</p>
          <p css={subTitleStyle}>
            총 1종류의 상품 2개를 주문합니다. <br />
            최종 결제 금액을 확인해 주세요..
          </p>
        </div>
        <SelectedCartContainer />
        <PaymentSummary price={totalPrice} />
      </Main>
      <Footer>
        <Button onClick={() => {}} type="submit" size="full" disabled={false}>
          결제하기
        </Button>
      </Footer>
    </PageLayout>
  );
}
