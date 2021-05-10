import React, { FC, ReactNode } from "react";

import { Container, H1 } from "./style";

interface IPageTitleProps {
  children: ReactNode;
}

const PageTitle: FC<IPageTitleProps> = ({ children }) => (
  <Container>
    <H1>{children}</H1>
  </Container>
);

export default PageTitle;
export { IPageTitleProps };
