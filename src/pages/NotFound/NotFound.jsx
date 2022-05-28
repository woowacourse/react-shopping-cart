import * as S from './NotFound.styles';
import { PageLayout } from 'components';

function NotFound() {
  return (
    <PageLayout>
      <S.Message>🥕 찾을 수 없는 페이지입니다 🥕</S.Message>
    </PageLayout>
  );
}

export default NotFound;
