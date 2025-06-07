import * as S from "../CartPage/CartPage.styled";
import Header from "../../components/Header/Header";
import BackArrow from "../../components/Icon/BackArrow";
import { useLocation, useNavigate } from "react-router-dom";
import OrderResult from "../../components/OrderResult/OrderResult";
import { ResponseCartItem } from "../../types/types";

interface LocationState {
  selectedCartItem: ResponseCartItem[];
  totalPrice: number;
}

const OrderCompletePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  return (
    <S.Root>
      <S.CartPageWrapper>
        <Header>
          <S.HeaderTitle>
            <S.HeaderIcon onClick={() => navigate("/")}>
              <BackArrow />
            </S.HeaderIcon>
          </S.HeaderTitle>
        </Header>
        <OrderResult
          selectedCartItem={state.selectedCartItem}
          totalPrice={state.totalPrice}
        />
        <S.OrderButton disabled={true}>주문 완료</S.OrderButton>
      </S.CartPageWrapper>
    </S.Root>
  );
};

export default OrderCompletePage;
