import MainLayout from "@/components/layout/MainLayout.tsx";
import { HEADER_TITLES } from "@/constants/titleAndCaption.ts";
import CartPageSkeleton from "@/pages/CartPage/CartPage.skeleton.tsx";
import CartPage from "@/pages/CartPage/CartPage.tsx";

import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "../Error/ErrorPage";
import { useSetRecoilState } from "recoil";
import { cartItemsState } from "@/recoil/cartItems";
import { useEffect } from "react";
import { getCartItems } from "@/auth/apis/cart";
import AddMockItemButton from "@/mocks/AddMockItemButton.tsx";

const CartPageDataLoader = () => {
  const setCartItems = useSetRecoilState(cartItemsState);

  useEffect(() => {
    const updateCartItems = async () => {
      const newCartItems = await getCartItems();
      setCartItems(newCartItems);
    };

    updateCartItems();
  }, [setCartItems]);

  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <MainLayout>
        <MainLayout.TitleHeader text={HEADER_TITLES.shop} />
        <MainLayout.Body fallback={<CartPageSkeleton />}>
          <CartPage />
          <AddMockItemButton />
        </MainLayout.Body>
      </MainLayout>
    </ErrorBoundary>
  );
};

export default CartPageDataLoader;
