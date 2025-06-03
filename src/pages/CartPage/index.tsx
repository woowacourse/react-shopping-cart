import * as S from "./CartPage.styled";
import CartItemList from "../../components/Cart/CartItemList";
import Button from "../../components/common/Button";
import Text from "../../components/common/Text";
import useCart from "../../hooks/useCart";
import { useNavigate } from "react-router";
import OrderList from "../../components/Order/OrderList";
import LoadingSpinner from "../../components/icons/LoadingSpinner";

const CartPage = () => {
  const { isLoading, cartItemsInfo, cartItemListProps, orderResult } = useCart();

  const navigate = useNavigate();
  const handleNavigate = () => navigate("/order-confirm", { state: orderResult });
  return (
    <S.Container>
      <Text variant="title-1">장바구니</Text>
      {isLoading && <LoadingSpinner />}
      {cartItemsInfo.cartItemsCount > 0 ? (
        <S.Information>
          <Text variant="body-3">현재 {cartItemsInfo.cartItemsCount}종류의 상품이 담겨있습니다.</Text>
          <CartItemList cartItemListProps={cartItemListProps} />
          <OrderList cartItemsInfo={cartItemsInfo} />
        </S.Information>
      ) : (
        <S.NoInformation>
          <Text variant="body-3">장바구니에 담은 상품이 없습니다.</Text>
        </S.NoInformation>
      )}
      <S.ButtonWrap>
        <Button
          variant={cartItemsInfo.cartItemsCount > 0 && cartItemsInfo.cartItemsCheckedCount > 0 ? "primary" : "disabled"}
          onClick={handleNavigate}
        >
          주문 확인
        </Button>
      </S.ButtonWrap>
    </S.Container>
  );
};

export default CartPage;
