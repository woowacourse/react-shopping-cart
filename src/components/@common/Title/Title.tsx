import { PropsWithChildren } from "react";
import * as S from "./Title.styles";

const Title = ({ children }: PropsWithChildren) => {
  return <S.Title>{children}</S.Title>;
};

export default Title;
