import React, { FC, ReactNode } from "react";

import { Container } from "./style";

interface IPageTitleProps {
  children: ReactNode;
}

const PageTitle: FC<IPageTitleProps> = ({ children }) => (
  <Container>
    <h1>{children}</h1>
  </Container>
);

export default PageTitle;
export { IPageTitleProps };
