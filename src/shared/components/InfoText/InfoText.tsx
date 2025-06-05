import { PropsWithChildren } from "react";
import * as S from "./InfoText.styled";
import InfoIcon from "@assets/icons/info.svg";

export default function InfoText({ children }: PropsWithChildren) {
  return (
    <S.InfoContainer>
      <S.InfoIcon src={InfoIcon} alt="안내 아이콘" />
      <S.InfoText>{children}</S.InfoText>
    </S.InfoContainer>
  );
}
