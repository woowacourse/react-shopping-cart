import { Suspense } from "react";
import * as S from "./MainLayout.style";
import Header from "./Header/Header";
import BackButton from "../_common/BackButton/BackButton";

interface BaseHeader {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface TitleHeader extends BaseHeader {
  type: "title";
  title: string;
}

interface BackButtonHeader extends BaseHeader {
  type: "backButton";
}

type HeaderType = TitleHeader | BackButtonHeader;

const MainLayout = (props: HeaderType) => {
  return (
    <S.Wrapper>
      <Header>
        {props.type === "title" ? (
          <S.CartHeaderTitle>{props.title}</S.CartHeaderTitle>
        ) : (
          <BackButton />
        )}
      </Header>
      <S.LayoutWrapper>
        <Suspense fallback={props.fallback}>{props.children}</Suspense>
      </S.LayoutWrapper>
    </S.Wrapper>
  );
};

export default MainLayout;
