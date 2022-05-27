import React from "react";

import { Outlet } from "react-router-dom";
import Header from "@/components/header/Header";
import ContentWrapper from "@/components/wrapper/ContentWrapper.styled";

function Layout() {
  return (
    <>
      <Header />
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </>
  );
}

export default Layout;
