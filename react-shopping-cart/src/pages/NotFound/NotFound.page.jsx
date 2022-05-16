import { PageContainer, Error } from 'components/@shared';
import Header from 'components/Header/Header.component';

function NotFoundPage() {
  return (
    <>
      <Header />
      <PageContainer>
        <Error>잘못된 페이지 접근입니다.</Error>
      </PageContainer>
    </>
  );
}

export default NotFoundPage;
