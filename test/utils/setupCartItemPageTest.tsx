import { render } from "@testing-library/react";

import cartItemsApi from "../../src/apis/cartItems";
import { vi } from "vitest";
import { CartItem } from "../../src/types/type";
import { MemoryRouter } from "react-router";
import CartItemPage from "../../src/pages/CartItemPage";
import { CartItemProvider } from "../../src/contexts/CartItemContext";

export const setupCartPageTest = (mockItems: CartItem[]) => {
  cartItemsApi.get = vi.fn(async () => [...mockItems]);

  return render(
    <MemoryRouter>
      <CartItemProvider>
        <CartItemPage />
      </CartItemProvider>
    </MemoryRouter>
  );
};
