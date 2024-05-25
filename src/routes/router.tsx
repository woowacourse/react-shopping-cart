import {createBrowserRouter} from "react-router-dom";

import {PAGE_URL} from "../constants/url.ts";
import PaymentConfirmPage from "../pages/PaymentConfimPage/PaymentConfirmPage.tsx";
import OrderConfirmDataLoader from "../pages/OrderConfirmPage/OrderConfirmDataLoader.tsx";
import CartPageDataLoader from "@/pages/CartPage/CartPageDataLoader.tsx";

const router = createBrowserRouter(
    [
        {
            path: PAGE_URL.home,
            element: <CartPageDataLoader/>
        },
        {
            path: PAGE_URL.orderConfirm,
            element: <OrderConfirmDataLoader/>,
        },
        {
            path: PAGE_URL.paymentConfirm,
            element: <PaymentConfirmPage/>,
        },
    ]);

export default router;
