import * as S from "./CartList.styled";
import { ReactNode } from "react";

type CartListProps = {
  children: ReactNode;
};

export default function CartList({ children }: CartListProps) {
  return <S.List>{children}</S.List>;
}
