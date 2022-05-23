import Icon from 'components/@common/Icon';

import { ICON_CODE } from 'constants/';
import * as S from './styles';

function Counter({ onChange, children }) {
  const onClickUpButton = () => {
    onChange(Number(children) + 1);
  };

  const onClickDownButton = () => {
    onChange(Number(children) - 1);
  };

  return (
    <S.Container>
      <S.CounterText value={Number(children)} readOnly />

      <S.ButtonContainer>
        <S.ControlButton onClick={onClickUpButton}>
          <Icon icon={ICON_CODE.UP} />
        </S.ControlButton>
        <S.ControlButton onClick={onClickDownButton} disabled={children <= 1}>
          <Icon icon={ICON_CODE.DOWN} />
        </S.ControlButton>
      </S.ButtonContainer>
    </S.Container>
  );
}

export default Counter;
