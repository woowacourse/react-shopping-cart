import PropTypes from 'prop-types';

import * as S from './styles';

function StatusMessage({ status, children }) {
  return (
    <S.Container status={status}>
      {(status === 'error' && (
        <>
          <S.Title>이런 오류를 예상한건 아닌데...</S.Title>
          <S.ErrorText>{children}</S.ErrorText>
        </>
      )) || <S.Title>{children}</S.Title>}
    </S.Container>
  );
}

StatusMessage.defaultProps = {
  status: 'loading',
};

StatusMessage.propTypes = {
  status: PropTypes.oneOf(['error', 'loading', 'empty']),
};

export default StatusMessage;
