import React from "react";
import { Wrapper } from "./style";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Layout;
