import PropTypes from 'prop-types';

import * as Styled from './styles';

function StatusMessage({ status, children }) {
  return (
    <Styled.Container status={status}>
      {status === 'error' ? (
        <>
          <Styled.Title>이런 오류를 예상한건 아닌데...</Styled.Title>
          <Styled.ErrorText>{children}</Styled.ErrorText>
        </>
      ) : (
        <Styled.Title>{children}</Styled.Title>
      )}
    </Styled.Container>
  );
}

StatusMessage.defaultProps = {
  status: 'loading',
};

StatusMessage.propTypes = {
  status: PropTypes.oneOf(['error', 'loading']),
};

export default StatusMessage;
