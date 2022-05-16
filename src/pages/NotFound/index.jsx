import { Link } from 'react-router-dom';

import Button from 'components/@common/Button';
import StatusMessage from 'components/@common/StatusMessage';

import { ICON_CODE } from 'constants/';
import * as Styled from './styles';

export function NotFound() {
  return (
    <Styled.Container>
      <StatusMessage status="error">존재하지 않는 페이지입니다.</StatusMessage>
      <Styled.ButtonContainer>
        <Link to="/">
          <Button type="button" icon={ICON_CODE.HOME}>
            홈 화면으로
          </Button>
        </Link>
      </Styled.ButtonContainer>
    </Styled.Container>
  );
}
export default NotFound;
