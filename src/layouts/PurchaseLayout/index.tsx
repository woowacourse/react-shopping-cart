import { ReactNode } from "react";

import * as S from "./styled";

interface PurchaseLayoutProps {
  title?: string;
  children: ReactNode;
}

const PurchaseLayout = ({ title = "", children }: PurchaseLayoutProps) => {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      {children}
    </S.Container>
  );
};

export default PurchaseLayout;
