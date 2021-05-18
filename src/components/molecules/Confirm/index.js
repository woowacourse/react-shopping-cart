import { PropTypes } from 'prop-types';
import * as S from './style.js';

export const Confirm = (props) => {
  const { isOpen, message, onApprove, onCancel } = props;

  return (
    <S.Container isVisible={isOpen}>
      <S.Inner>
        <S.Message>{message}</S.Message>
        <S.CancelButton onClick={onCancel}>취소</S.CancelButton>
        <S.ApproveButton onClick={onApprove}>확인</S.ApproveButton>
      </S.Inner>
    </S.Container>
  );
};

Confirm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  message: PropTypes.node.isRequired,
  onApprove: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
