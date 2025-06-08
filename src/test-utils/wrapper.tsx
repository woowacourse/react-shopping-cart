import { MemoryRouter } from "react-router-dom";
import { ToastProvider } from "../contexts/ToastContext";
import { CartProvider } from "../contexts/CartContext";
import { CouponProvider } from "../contexts/CouponContext";

const wrapper = ({ children }: React.PropsWithChildren) => (
  <MemoryRouter>
    <ToastProvider>
      <CartProvider>
        <CouponProvider>{children}</CouponProvider>
      </CartProvider>
    </ToastProvider>
  </MemoryRouter>
);

export default wrapper;
