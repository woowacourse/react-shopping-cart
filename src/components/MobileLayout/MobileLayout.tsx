import { ReactNode } from "react";
import * as S from "./MobileLayout.styles";

interface MobileLayoutProps {
  children: ReactNode;
}

function MobileLayout({ children }: MobileLayoutProps) {
  return (
    <S.Container>
      <S.SidePanel>
        <S.SidePanelText>장바구니 🛒</S.SidePanelText>
      </S.SidePanel>
      <S.Content>{children}</S.Content>
      <S.SidePanel>
        <S.SidePanelText>메이토 & 니야</S.SidePanelText>
      </S.SidePanel>
    </S.Container>
  );
}

export default MobileLayout;
