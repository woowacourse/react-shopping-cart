import { PropsWithChildren } from "react";
import * as S from "./MobileLayout.styles";

function MobileLayout({ children }: PropsWithChildren) {
  return (
    <S.Container>
      <S.SidePanel>
        <S.SidePanelText>장바구니 🛒</S.SidePanelText>
      </S.SidePanel>
      <S.Content id="custom-root">{children}</S.Content>
      <S.SidePanel>
        <S.SidePanelText>메이토 & 니야</S.SidePanelText>
      </S.SidePanel>
    </S.Container>
  );
}

export default MobileLayout;
