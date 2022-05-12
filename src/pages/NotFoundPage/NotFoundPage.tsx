import styled from 'styled-components';

function NotFoundPage() {
  return <StyledPage>잘못된 접근입니다 ㅠ</StyledPage>;
}

const StyledPage = styled.div`
  margin: 60px 0;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export default NotFoundPage;
