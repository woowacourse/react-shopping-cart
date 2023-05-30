import * as Styled from './styles/NotFound.styles';
import { Button as GoToHomeButton } from '../ui/Button';

export const NotFound = () => {
  return (
    <Styled.Wrapper>
      <h2>404 ERROR 🧐</h2>
      <p>요청하신 페이지를 찾을 수 없습니다.</p>
      <p>페이지 주소를 다시 한 번 확인해주세요.</p>
      <Styled.GoToHomeButtonWrapper to={'/'}>
        <GoToHomeButton width="148px" height="36px" backgroundColor="#04c09e">
          상품페이지로 이동
        </GoToHomeButton>
      </Styled.GoToHomeButtonWrapper>
    </Styled.Wrapper>
  );
};
