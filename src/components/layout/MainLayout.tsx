import React from "react";
import * as S from "./MainLayout.style";

interface HeaderProps {
  children: React.ReactNode;
}

export const MainLayoutWrapper = ({ children }: HeaderProps) => {
  return <S.Wrapper>{children}</S.Wrapper>;
};

export const Header = ({ children }: React.PropsWithChildren) => {
  return <S.Header>{children}</S.Header>;
};

export const TitleHeader = ({ text }: { text: string }) => {
  return (
    <S.Header>
      <S.Title>{text}</S.Title>
    </S.Header>
  );
};

export const Body = ({ children }: { children: React.ReactNode }) => {
  return <S.LayoutWrapper>{children}</S.LayoutWrapper>;
};
const MainLayout = Object.assign(MainLayoutWrapper, {
  Header,
  TitleHeader,
  Body,
});

export default MainLayout;
