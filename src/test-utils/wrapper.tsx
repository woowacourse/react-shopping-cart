import { MemoryRouter } from "react-router-dom";
import { ToastProvider } from "../contexts/ToastContext";
import { CartProvider } from "../contexts/CartContext";

const wrapper = ({ children }: React.PropsWithChildren) => (
  <MemoryRouter>
    <ToastProvider>
      <CartProvider>{children}</CartProvider>
    </ToastProvider>
  </MemoryRouter>
);

export default wrapper;
