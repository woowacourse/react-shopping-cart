import { PageLayout } from 'component';
import styled from 'styled-components';

const Message = styled.div`
  height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  font-size: 30px;
`;

function NotFound() {
  return (
    <PageLayout>
      <Message>🥕 찾을 수 없는 페이지입니다 🥕</Message>
    </PageLayout>
  );
}

export default NotFound;
