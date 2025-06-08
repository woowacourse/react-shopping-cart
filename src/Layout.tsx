import { Outlet } from "react-router";

import { CartItemListProvider } from "./contexts/CartItemListContext";
import { ErrorProvider } from "./contexts/ErrorContext";
import { CouponListProvider } from "./contexts/CouponContext";

export default function Layout() {
  return (
    <ErrorProvider>
      <CartItemListProvider>
        <CouponListProvider>
          <Outlet />
        </CouponListProvider>
      </CartItemListProvider>
    </ErrorProvider>
  );
}
