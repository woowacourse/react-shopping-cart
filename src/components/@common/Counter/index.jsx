import PropTypes from 'prop-types';
import { getNumberFormatter } from 'lib/formatterUtils';

import Icon from 'components/@common/Icon';

import { ICON_CODE } from 'constants/';
import * as S from './styles';

function Counter({ onClickUpButton, onClickDownButton, onChangeInputValue, children }) {
  return (
    <S.Container>
      <S.CounterText onChange={onChangeInputValue} value={getNumberFormatter(children)} />

      <S.ButtonContainer>
        <S.ControlButton onClick={onClickUpButton}>
          <Icon icon={ICON_CODE.UP} />
        </S.ControlButton>
        <S.ControlButton onClick={onClickDownButton}>
          <Icon icon={ICON_CODE.DOWN} />
        </S.ControlButton>
      </S.ButtonContainer>
    </S.Container>
  );
}

Counter.defaultProps = {
  children: 1500,
};

Counter.propTypes = {
  children: PropTypes.string,
};

export default Counter;
