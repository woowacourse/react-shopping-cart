import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { checkedCartItemsState } from "../recoil/atoms";
import { checkedCartItemsQuantityState, totalCheckedCartItemsPriceState } from "../recoil/selectors";
import Header from "../components/common/Header/index";
import { COLOR, FONT_SIZE, FONT_WEIGHT } from "../constants/styles";
import { SHOPPING_MESSAGE } from "../constants/messages";
import FooterButton from "../components/common/FooterButton";
import { useNavigate } from "react-router-dom";
import PAGE_URL from "../constants/pageURL";

const CompleteOrder = () => {
  const [checkedCartItems, setCheckedCartItem] = useRecoilState(checkedCartItemsState);
  const totalCheckedCartItemsPrice = useRecoilValue(totalCheckedCartItemsPriceState);
  const checkedCartItemsQuantity = useRecoilValue(checkedCartItemsQuantityState);
  const router = useNavigate();

  const description = SHOPPING_MESSAGE.orderDescription(checkedCartItems.length, checkedCartItemsQuantity);

  return (
    <>
      <Header type="logo" />
      <PageContainer>
        <Title>주문확인</Title>
        <Description>{description}</Description>
        <TotalPaymentsWrapper>
          <TotalAmount>총 결제 금액</TotalAmount>
          <Title>{totalCheckedCartItemsPrice.toLocaleString()}</Title>
        </TotalPaymentsWrapper>
        <FooterButton
          buttonText={SHOPPING_MESSAGE.goBackToBasket}
          onClick={() => {
            setCheckedCartItem([]);
            router(PAGE_URL.ShoppingCart);
          }}
        />
      </PageContainer>
    </>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
  gap: 24px;
`;

const Title = styled.p`
  font-size: ${FONT_SIZE.large};
  font-weight: ${FONT_WEIGHT.bold};
  line-height: 34.75px;
  text-align: left;
  color: ${COLOR.black};
`;

const Description = styled.p`
  font-size: ${FONT_SIZE.small};
  font-weight: ${FONT_WEIGHT.medium};
  line-height: 18px;
  text-align: center;
  color: ${COLOR.black};
`;

const TotalPaymentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const TotalAmount = styled.p`
  font-size: ${FONT_SIZE.medium};
  font-weight: ${FONT_WEIGHT.bold};
  line-height: 16px;
  text-align: center;
  color: ${COLOR.black};
`;

export default CompleteOrder;
