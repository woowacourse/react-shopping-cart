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

function OrderCompletePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedCartItem, totalPrice }: LocationState = location.state;

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
          selectedCartItem={selectedCartItem}
          totalPrice={totalPrice}
        />
        <S.OrderButton onClick={() => navigate("/")}>
          장바구니로 돌아가기
        </S.OrderButton>
      </S.CartPageWrapper>
    </S.Root>
  );
}

export default OrderCompletePage;
