<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { CartContentSection } from "../../components/cartContentSection/CartContentSection";
import { CartLayout } from "../../components/cartLayout/CartLayout";
import { ContentHeader } from "../../components/contentHeader/ContentHeader";
import { BUTTON_COLORS, CART, HEADER_TYPES, PATHS } from "../../constants";
import { useFetchCartItems } from "../../hooks/useFetchCartItems";
import { checkedItemState, selectedCartItemsState } from "../../recoil/atoms/atoms";
import { cartSummarySelectorState } from "../../recoil/selector/selector";

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems } = useFetchCartItems();
  const { uniqueItemCount } = useRecoilValue(cartSummarySelectorState);
  const checkedItems = useRecoilValue(checkedItemState);
  const setSelectedCartItems = useSetRecoilState(selectedCartItemsState);

  const navigateToOrderConfirmationPage = () => {
    const selectedItems = cartItems.filter((item) => checkedItems[item.id]);
    setSelectedCartItems(selectedItems);
    navigate(PATHS.ORDER_CONFIRMATION);
  };
=======
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { getCartItems } from "../../api";
import { ConfirmButton } from "../../components/button";
import { CartContentSection } from "../../components/cartContentSection/CartContentSection";
import { CartHeader } from "../../components/cartHeader/CartHeader";
import Header from "../../components/header/Header";
import { BUTTON_COLORS, CART, ERROR_MESSAGES, HEADER_TYPES } from "../../constants";
import { cartItemsState } from "../../recoil/atoms/atoms";
import { cartSummarySelectorState } from "../../recoil/selector/selector";
import { StyledCartPage } from "./CartPage.styled";

export const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);
  const { uniqueItemCount } = useRecoilValue(cartSummarySelectorState);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const items = await getCartItems();
        setCartItems(items);
      } catch (error) {
        console.error(ERROR_MESSAGES.FETCH_CART_ITEMS, error);
      }
    };

    fetchCartItems();
  }, []);
>>>>>>> 00kang

  const buttonMode =
    uniqueItemCount === CART.EMPTY_THRESHOLD ? BUTTON_COLORS.LIGHT : BUTTON_COLORS.DARK;

<<<<<<< HEAD
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
=======
  return (
    <>
      <Header type={HEADER_TYPES.SHOP} />
      <StyledCartPage>
        <CartHeader cartItemCount={cartItems.length} />
        <CartContentSection cartItemCount={cartItems.length} />
      </StyledCartPage>
      <ConfirmButton text="주문 확인" mode={buttonMode} />
    </>
>>>>>>> 00kang
  );
};
