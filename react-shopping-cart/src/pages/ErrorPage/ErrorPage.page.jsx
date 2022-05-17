import Error from 'components/@shared/Error/Error.component';
import PageContainer from 'components/@shared/PageContainer/PageContainer.component';

function ErrorPage({ children }) {
  return (
    <PageContainer>
      <Error>{children}</Error>
    </PageContainer>
  );
}

export default ErrorPage;
