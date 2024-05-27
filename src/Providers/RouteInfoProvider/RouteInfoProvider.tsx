import { PropsWithChildren, createContext } from "react";
import { FooterInfo, HeaderInfo, MainInfo, RoutesObject } from "./useRouteInfo";
import useRouteInfo from "./useRouteInfo";

export const HeaderRouteInfoContext = createContext<null | RoutesObject<HeaderInfo>>(null);
export const MainRouteInfoContext = createContext<null | RoutesObject<MainInfo>>(null);
export const FooterRouteInfoContext = createContext<null | RoutesObject<FooterInfo>>(null);

const RouteInfoProvider = ({ children }: PropsWithChildren) => {
  const { headerInfo, mainInfo, footerInfo } = useRouteInfo();
  return (
    <HeaderRouteInfoContext.Provider value={headerInfo}>
      <MainRouteInfoContext.Provider value={mainInfo}>
        <FooterRouteInfoContext.Provider value={footerInfo}>{children}</FooterRouteInfoContext.Provider>
      </MainRouteInfoContext.Provider>
    </HeaderRouteInfoContext.Provider>
  );
};

export default RouteInfoProvider;
