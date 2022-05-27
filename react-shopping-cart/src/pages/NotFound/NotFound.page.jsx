import { Error, FlexWrapper } from 'components/@shared';

function NotFoundPage() {
  return (
    <FlexWrapper style={{ margin: '60px 0 60px' }} isColumnDirection={true}>
      <Error>잘못된 페이지 접근입니다.</Error>
    </FlexWrapper>
  );
}

export default NotFoundPage;
