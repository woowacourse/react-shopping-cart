import * as S from "./CartPage.styled";
import CartItemList from "../../components/Cart/CartItemList";
import Button from "../../components/common/Button";
import Text from "../../components/common/Text";
import useCart from "../../hooks/useCart";
import { OrderPrice } from "../../components/Order/OrderPrice";
import { useNavigate } from "react-router";
import Header from "../../components/Header";
import Logo from "../../components/icons/Logo";

const CartPage = () => {
  const { cartItemsInfo, cartItemListProps, orderResult } = useCart();

  const navigate = useNavigate();
  const handleNavigate = () => navigate("/order-confirm", { state: orderResult });
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
            <CartItemList cartItemListProps={cartItemListProps} />
            <OrderPrice gap={12}>
              <OrderPrice.Description text="총 주문 금액이 100,000원 이상일 경우 무료 배송이 됩니다." />
              <OrderPrice.Wrap gap={8}>
                <OrderPrice.LabelWithPrice label="주문 금액" price={cartItemsInfo.orderPrice} />
                <OrderPrice.LabelWithPrice label="배송비" price={cartItemsInfo.deliveryPrice} />
              </OrderPrice.Wrap>
              <OrderPrice.Wrap>
                <OrderPrice.LabelWithPrice label="총 결제 금액" price={cartItemsInfo.totalPrice} />
              </OrderPrice.Wrap>
            </OrderPrice>
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

export default CartPage;
