import PageContainer from 'components/@shared/PageContainer/PageContainer.component';
import Header from 'components/Header/Header.component';
import Error from 'components/@shared/Error/Error.component';

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
