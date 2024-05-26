import { PropsWithChildren, createContext } from "react";
import { useRecoilValue } from "recoil";

import { orderAmountState } from "@/store/selector/selectors";
import routeInfo, { FooterInfo, HeaderInfo, MainInfo, RoutesObject } from "./RouteInfo";

export const HeaderRouteInfoContext = createContext<null | RoutesObject<HeaderInfo>>(null);
export const MainRouteInfoContext = createContext<null | RoutesObject<MainInfo>>(null);
export const FooterRouteInfoContext = createContext<null | RoutesObject<FooterInfo>>(null);

const RouteInfoProvider = ({ children }: PropsWithChildren) => {
  const orderAmount = useRecoilValue(orderAmountState);

  return (
    <HeaderRouteInfoContext.Provider value={routeInfo.headerInfo}>
      <MainRouteInfoContext.Provider value={routeInfo.mainInfo}>
        <FooterRouteInfoContext.Provider value={routeInfo.footerInfo(orderAmount)}>
          {children}
        </FooterRouteInfoContext.Provider>
      </MainRouteInfoContext.Provider>
    </HeaderRouteInfoContext.Provider>
  );
};

export default RouteInfoProvider;
