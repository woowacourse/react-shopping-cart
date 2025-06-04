import { useEffect, useState } from "react";
import * as S from "./CartPage.styles";
import {
  CartHeader,
  CartList,
  OrderPriceSummary,
} from "../../features/cart/ui";
import Navbar from "../../shared/ui/Navbar";
import CartPageFooter from "../../features/cart/ui/CartPageFooter";
import { getCartItems } from "../../features/cart/api/getCartItems";
import { useSelectedCartContext } from "../../shared/context/useCartContext";
import { CartItem } from "../../shared/type/cart";
import EmptyCartItemUI from "../../features/cart/ui/EmptyCartItemUI";
import { ROUTES } from "../../shared/constants/routeConstants";

function CartPage() {
  const { addAllCartItemsInSelected, selectedCartItems } =
    useSelectedCartContext();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await getCartItems();
        if (!response) return;

        setCartItems(response.content);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Failed to fetch cart items:", error.message);
          alert(
            "장바구니 아이템을 불러오는 데 실패했습니다. 다시 시도해주세요."
          );
        }
      }
    };
    fetchCartItems();
  }, [selectedCartItems]);

  return (
    <S.CartPageContainer>
      <Navbar title={"SHOP"} url={ROUTES.ROOT} />
      <S.CartPageContent>
        <CartHeader cartTypeQuantity={cartItems.length} />
        {cartItems.length > 0 ? (
          <>
            <CartList
              cartItems={cartItems}
              setCartItems={setCartItems}
              addAllCartItemsInSelected={addAllCartItemsInSelected}
            />
            <OrderPriceSummary />
          </>
        ) : (
          <EmptyCartItemUI />
        )}
      </S.CartPageContent>

      <CartPageFooter cartItemQuantity={cartItems.length} />
    </S.CartPageContainer>
  );
}

export default CartPage;
