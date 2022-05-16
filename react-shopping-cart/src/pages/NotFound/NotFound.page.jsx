import Error from 'components/@shared/Error/Error.component';
import PageContainer from 'components/@shared/PageContainer/PageContainer.component';

function NotFound() {
  return (
    <PageContainer>
      <Error>존재하지 않는 페이지입니다.</Error>
    </PageContainer>
  );
}

export default NotFound;
