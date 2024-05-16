import React, { PropsWithChildren } from "react";
import { BottomWrapper, Content, HeaderWrapper, LayoutWrapper } from "./styles";

interface LayoutProps {
  header: React.ReactNode;
  bottom: React.ReactNode;
}

const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({
  header,
  children,
  bottom,
}) => {
  return (
    <LayoutWrapper>
      <HeaderWrapper>{header}</HeaderWrapper>
      <Content>{children}</Content>
      <BottomWrapper>{bottom}</BottomWrapper>
    </LayoutWrapper>
  );
};

export default Layout;
