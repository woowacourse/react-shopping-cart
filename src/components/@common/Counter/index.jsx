import PropTypes from 'prop-types';

import { Icon } from 'components/@common';

import { ICON_CODE } from 'constants/';

import * as S from './styles';

function Counter({ count, onChange }) {
  const onClickUpButton = () => {
    onChange(count + 1);
  };

  const onClickDownButton = () => {
    onChange(count - 1);
  };

  return (
    <S.Container>
      <S.CounterText value={count} readOnly />

      <S.ButtonContainer>
        <S.ControlButton onClick={onClickUpButton}>
          <Icon icon={ICON_CODE.UP} />
        </S.ControlButton>
        <S.ControlButton onClick={onClickDownButton} disabled={count <= 1}>
          <Icon icon={ICON_CODE.DOWN} />
        </S.ControlButton>
      </S.ButtonContainer>
    </S.Container>
  );
}

Counter.defaultProps = {
  count: 0,
};

Counter.propTypes = {
  count: PropTypes.number,
};

export default Counter;
