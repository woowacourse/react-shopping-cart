import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { CartContentSection } from "../../components/cartContentSection/CartContentSection";
import { CartLayout } from "../../components/cartLayout/CartLayout";
import { ContentHeader } from "../../components/contentHeader/ContentHeader";
import { BUTTON_COLORS, CART, HEADER_TYPES, PATHS } from "../../constants";
import { useFetchCartItems } from "../../hooks/useFetchCartItems";
import { checkedItemState, selectedCartItemsState } from "../../recoil/atoms/atoms";
import { cartSummarySelectorState } from "../../recoil/selector/selector";
import { syncSelectedCartItems } from "../../utils/cartFilter";

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems } = useFetchCartItems();
  const { uniqueItemCount } = useRecoilValue(cartSummarySelectorState);
  const checkedItems = useRecoilValue(checkedItemState);
  const setSelectedCartItems = useSetRecoilState(selectedCartItemsState);

  const navigateToOrderConfirmationPage = () => {
    syncSelectedCartItems(cartItems, checkedItems, setSelectedCartItems);
    navigate(PATHS.ORDER_CONFIRMATION);
  };

  const buttonMode =
    uniqueItemCount === CART.EMPTY_THRESHOLD ? BUTTON_COLORS.LIGHT : BUTTON_COLORS.DARK;

  const description =
    cartItems.length > CART.EMPTY_THRESHOLD
      ? `현재 ${cartItems.length}종류의 상품이 담겨있습니다.`
      : "";

  return (
    <CartLayout
      headerType={HEADER_TYPES.SHOP}
      buttonText="주문 확인"
      buttonMode={buttonMode}
      onButtonClick={navigateToOrderConfirmationPage}
    >
      <ContentHeader title="장바구니" description={description} />
      <CartContentSection cartItemCount={cartItems.length} />
    </CartLayout>
  );
};
