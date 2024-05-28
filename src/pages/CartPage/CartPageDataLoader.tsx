import MainLayout from "@/components/layout/MainLayout.tsx";
import { HEADER_TITLES } from "@/constants/titleAndCaption.ts";
import CartPageSkeleton from "@/pages/CartPage/CartPage.skeleton.tsx";
import CartPage from "@/pages/CartPage/CartPage.tsx";

import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "../Error/ErrorPage";
import { Suspense, useEffect } from "react";
import useUpdateCartItems from "@/hooks/cart/useUpdateCartItems";

const CartPageDataLoader = () => {
  const { updateNewCartItems } = useUpdateCartItems();

  useEffect(() => {
    updateNewCartItems();
  }, []);

  return (
    <Suspense>
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <MainLayout>
          <MainLayout.TitleHeader text={HEADER_TITLES.shop} />
          <MainLayout.Body fallback={<CartPageSkeleton />}>
            <CartPage />
          </MainLayout.Body>
        </MainLayout>
      </ErrorBoundary>
    </Suspense>
  );
};

export default CartPageDataLoader;
