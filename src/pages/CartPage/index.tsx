import * as S from "./CartPage.styled";
import Button from "../../components/common/Button";
import Text from "../../components/common/Text";
import useCart from "../../hooks/useCart";
import CartCardListSection from "./components/CartCardListSection";
import LoadingSpinner from "../../components/icons/LoadingSpinner";
import { useNavigate } from "react-router";

const CartPage = () => {
  const { isLoading, cartItemsInfo, cartItemListProps, orderResult } = useCart();

  const navigate = useNavigate();
  const handleNavigate = () => navigate("/order-confirm", { state: orderResult });
  return (
    <S.Container>
      <Text variant="title-1">장바구니</Text>
      <CartCardListSection cartItemsInfo={cartItemsInfo} cartItemListProps={cartItemListProps} />
      <S.ButtonWrap>
        <Button
          variant={cartItemsInfo.cartItemsCount > 0 && cartItemsInfo.cartItemsCheckedCount > 0 ? "primary" : "disabled"}
          onClick={handleNavigate}
        >
          주문 확인
        </Button>
      </S.ButtonWrap>
      {isLoading && <LoadingSpinner />}
    </S.Container>
  );
};

export default CartPage;
