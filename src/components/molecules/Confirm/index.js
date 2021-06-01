import * as S from './style.js';

export const Confirm = (props) => {
  const { isOpened, message, onApprove, onClose } = props

  return (
    <S.Container isOpened={isOpened}>
      <S.Inner>
        <S.Message>{message}</S.Message>
        <S.CancelButton onClick={onClose}>취소</S.CancelButton>
        <S.ApproveButton onClick={onApprove}>확인</S.ApproveButton>
      </S.Inner>
    </S.Container>
  );
};
