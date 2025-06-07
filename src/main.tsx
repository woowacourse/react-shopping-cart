import ReactDOM from "react-dom/client";
import "./index.css";
import "./reset.css";
import { RouterProvider } from "react-router-dom";
import router from "./router.tsx";
import { CouponManagerProvider } from "./contexts/CouponManagerProvider.tsx";
import { CouponProvider } from "./contexts/CouponProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <CouponManagerProvider>
    <CouponProvider>
      <RouterProvider router={router} />
    </CouponProvider>
  </CouponManagerProvider>
);
