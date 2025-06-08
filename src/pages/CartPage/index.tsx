import * as S from "./CartPage.styled";
import Button from "../../components/common/Button";
import Text from "../../components/common/Text";
import CartCardListSection from "./components/CartCardListSection";
import LoadingSpinner from "../../components/icons/LoadingSpinner";
import { useNavigate } from "react-router";
import { useCartItems } from "./contexts/CartItemsContext";
import { useCartSelection } from "./hooks/useCartSelection";

const CartPage = () => {
  const { cartItems, isLoading } = useCartItems();
  const { checkedIds, handleCheckChange } = useCartSelection(cartItems);
  const checkedItems = cartItems.filter((item) => checkedIds.includes(item.id));
  const navigate = useNavigate();
  const handleNavigate = () => navigate("/order-confirm", { state: checkedItems });
  return (
    <S.Container>
      <Text variant="title-1">장바구니</Text>
      <CartCardListSection checkedIds={checkedIds} handleCheckChange={handleCheckChange} />
      <S.ButtonWrap>
        <Button
          variant={cartItems.length > 0 && checkedIds.length > 0 ? "primary" : "disabled"}
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
