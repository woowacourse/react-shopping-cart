import { PropsWithChildren, createContext } from "react";
import { useRecoilValue } from "recoil";
import { To } from "react-router-dom";

import { orderAmountState } from "@/store/selector/selectors";

import Cart from "@/routes/Cart";
import CheckOrder from "@/routes/CheckOrder";
import Order from "@/routes/Order";
import { RiArrowLeftLine } from "react-icons/ri";

export const routes = [
  {
    path: "/",
    element: <Cart />,
  },
  {
    path: "/check-order",
    element: <CheckOrder />,
  },
  {
    path: "/order",
    element: <Order />,
  },
] as const;

const paths = routes.map((route) => route.path);
export type RoutePaths = (typeof paths)[number];
export type RoutesObject<T> = Record<RoutePaths, T>;

interface HeaderInfo {
  leftButtonContent: React.ReactNode;
  linkTo: To | number;
}

interface FooterInfo {
  content: string;
  isButtonDisabled: boolean;
  linkTo: To | number;
}

export const HeaderRouteInfoContext = createContext<null | RoutesObject<HeaderInfo>>(null);
export const FooterRouteInfoContext = createContext<null | RoutesObject<FooterInfo>>(null);

const RouteInfoProvider = ({ children }: PropsWithChildren) => {
  const orderAmount = useRecoilValue(orderAmountState);

  const footerInfo: RoutesObject<FooterInfo> = {
    "/": {
      content: "주문 확인",
      isButtonDisabled: orderAmount === 0,
      linkTo: "/check-order",
    },
    "/check-order": {
      content: "결제하기",
      isButtonDisabled: orderAmount === 0,
      linkTo: "/order",
    },
    "/order": {
      content: "결제하기",
      isButtonDisabled: true,
      linkTo: 0,
    },
  };

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

  return (
    <HeaderRouteInfoContext.Provider value={headerInfo}>
      <FooterRouteInfoContext.Provider value={footerInfo}>{children}</FooterRouteInfoContext.Provider>
    </HeaderRouteInfoContext.Provider>
  );
};

export default RouteInfoProvider;
