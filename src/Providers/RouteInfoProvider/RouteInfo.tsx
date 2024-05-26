import { placeOrders } from "@/api";
import Cart from "@/routes/Cart";
import CheckOrder from "@/routes/CheckOrder";
import Order from "@/routes/Order";
import { ModalProvider } from "easy-payments-ui";
import { RiArrowLeftLine } from "react-icons/ri";
import { To } from "react-router-dom";

export const routes = [
  {
    path: "/",
    element: <Cart />,
  },
  {
    path: "/check-order",
    element: (
      <ModalProvider>
        <CheckOrder />
      </ModalProvider>
    ),
  },
  {
    path: "/order",
    element: <Order />,
  },
] as const;

const paths = routes.map((route) => route.path);
export type RoutePaths = (typeof paths)[number];
export type RoutesObject<T> = Record<RoutePaths, T>;

export interface HeaderInfo {
  leftButtonContent: React.ReactNode;
  linkTo: To | number;
}

export interface MainInfo {
  cartDescription?: string;
}

export interface FooterInfo {
  content: string;
  isButtonDisabled: boolean;
  linkTo: To | number;
  handleClick?: () => void;
}

const headerInfo: RoutesObject<HeaderInfo> = {
  "/": {
    leftButtonContent: "SHOP",
    linkTo: 0,
  },
  "/check-order": {
    leftButtonContent: <RiArrowLeftLine size={30} />,
    linkTo: -1,
  },
  "/order": {
    leftButtonContent: <RiArrowLeftLine size={30} />,
    linkTo: -1,
  },
};

const mainInfo: RoutesObject<MainInfo> = {
  "/": {},
  "/check-order": {
    cartDescription: "최종 결제 금액을 확인해주세요.",
  },
  "/order": {},
};

const footerInfo = (orderAmount: number): RoutesObject<FooterInfo> => ({
  "/": {
    content: "주문 확인",
    isButtonDisabled: orderAmount === 0,
    linkTo: "/check-order",
  },
  "/check-order": {
    content: "결제하기",
    isButtonDisabled: orderAmount === 0,
    linkTo: "/order",
    handleClick: placeOrders,
  },
  "/order": {
    content: "결제하기",
    isButtonDisabled: true,
    linkTo: "/",
  },
});

const routeInfo = {
  headerInfo,
  mainInfo,
  footerInfo,
};

export default routeInfo;
