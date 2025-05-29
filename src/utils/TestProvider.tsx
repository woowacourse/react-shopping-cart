import { MemoryRouter } from "react-router";

import { CartItemListProvider } from "../contexts/CartItemListContext";
import { ErrorProvider } from "../contexts/ErrorContext";

export default function TestProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MemoryRouter>
      <ErrorProvider>
        <CartItemListProvider>{children}</CartItemListProvider>
      </ErrorProvider>
    </MemoryRouter>
  );
}
