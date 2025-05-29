import { Outlet, useLocation } from "react-router";
import Header from "./components/layout/Header/Header";
import BackButton from "./components/layout/Header/BackButton";

import { CartItemListProvider } from "./contexts/CartItemListContext";
import { ErrorProvider } from "./contexts/ErrorContext";

export default function Layout() {
  const location = useLocation();
  const isShoppingCartPage = location.pathname === "/";

  return (
    <ErrorProvider>
      <CartItemListProvider>
        <Header>{isShoppingCartPage ? "SHOP" : <BackButton />}</Header>
        <Outlet />
      </CartItemListProvider>
    </ErrorProvider>
  );
}
