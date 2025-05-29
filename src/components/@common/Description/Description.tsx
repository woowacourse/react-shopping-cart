import { PropsWithChildren } from "react";
import * as S from "./Description.styles";

const Description = ({ children }: PropsWithChildren) => {
  return <S.Description>{children}</S.Description>;
};

export default Description;
