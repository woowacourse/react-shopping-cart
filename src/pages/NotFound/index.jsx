import { Link } from 'react-router-dom';

import Button from 'components/@common/Button';
import StatusMessage from 'components/@common/StatusMessage';

import { ICON_CODE } from 'constants/';
import * as S from './styles';

export function NotFound() {
  return (
    <S.Container>
      <StatusMessage status="error">존재하지 않는 페이지입니다.</StatusMessage>
      <S.ButtonContainer>
        <Link to="/">
          <Button type="button" icon={ICON_CODE.HOME}>
            홈 화면으로
          </Button>
        </Link>
      </S.ButtonContainer>
    </S.Container>
  );
}
export default NotFound;
