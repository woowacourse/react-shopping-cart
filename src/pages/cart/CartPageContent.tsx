import * as S from "./CartPageContent.styled";
import CartItemList from "./components/CartItemList";
import Button from "../../shared/components/common/Button";
import Text from "../../shared/components/common/Text";
import { useNavigate } from "react-router";
import Header from "../../shared/components/Header";
import Logo from "../../shared/components/icons/Logo";
import CartPrice from "./components/CartPrice";
import { useCartContext } from "./contexts/CartContext";

const CartPageContent = () => {
  const { cartItemsInfo, orderConfirmPageData } = useCartContext();
  const navigate = useNavigate();

  const handleNavigate = () => navigate("/order-confirm", { state: orderConfirmPageData });

  return (
    <>
      <Header>
        <Logo />
      </Header>
      <S.Container>
        <Text variant="title-1">장바구니</Text>
        {cartItemsInfo.cartItemsCount > 0 ? (
          <S.Information>
            <Text variant="body-3">현재 {cartItemsInfo.cartItemsCount}종류의 상품이 담겨있습니다.</Text>
            <CartItemList />
            <CartPrice />
          </S.Information>
        ) : (
          <S.NoInformation>
            <Text variant="body-3">장바구니에 담은 상품이 없습니다.</Text>
          </S.NoInformation>
        )}
        <S.ButtonWrap>
          <Button
            variant={
              cartItemsInfo.cartItemsCount > 0 && cartItemsInfo.cartItemsCheckedCount > 0 ? "primary" : "disabled"
            }
            onClick={handleNavigate}
          >
            주문 확인
          </Button>
        </S.ButtonWrap>
      </S.Container>
    </>
  );
};

export default CartPageContent;
