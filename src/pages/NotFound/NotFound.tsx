import ErrorContainer from '../../components/common/ErrorContainer/ErrorContainer';
import PageTemplate from '../../components/common/PageTemplate/PageTemplate';

function NotFound() {
  return (
    <PageTemplate>
      <ErrorContainer>😱 존재하지 않는 페이지입니다. 😱</ErrorContainer>
    </PageTemplate>
  );
}

export default NotFound;
