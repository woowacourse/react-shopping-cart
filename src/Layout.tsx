import { Outlet } from "react-router";

import { CartItemListProvider } from "./contexts/CartItemListContext";
import { ErrorProvider } from "./contexts/ErrorContext";

export default function Layout() {
  return (
    <ErrorProvider>
      <CartItemListProvider>
        <Outlet />
      </CartItemListProvider>
    </ErrorProvider>
  );
}
