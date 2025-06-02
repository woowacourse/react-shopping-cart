import { PAGE_URL } from "../../constants/PageUrl.ts";
import { useNavigate } from "react-router";
import * as Styled from "./ErrorPage.style.tsx";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <Styled.Container>
      <Styled.Wrapper>
        <Styled.ContentSection>
          <Styled.Title>잘못된 접근입니다.</Styled.Title>
          <Styled.Description>
            홈으로 돌아가 주문을 진행해 주세요.
          </Styled.Description>
        </Styled.ContentSection>

        <Styled.ButtonSection>
          <Styled.Button onClick={() => navigate(PAGE_URL.HOME)}>
            홈으로 돌아가기
          </Styled.Button>
        </Styled.ButtonSection>
      </Styled.Wrapper>
    </Styled.Container>
  );
}
