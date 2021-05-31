import { useSelector, useDispatch } from 'react-redux';
import { confirmAction } from '../../../../redux';
import * as S from './style.js';

export const Confirm = () => {
  const { isOpened, message, approve } = useSelector(({ confirmReducer }) => confirmReducer);

  const dispatch = useDispatch();
  const dispatchCloseConfirm = () => dispatch(confirmAction.closeConfirm());
  const onApprove = () => {
    approve();
    dispatchCloseConfirm();
  };

  return (
    <S.Container isOpened={isOpened}>
      <S.Inner>
        <S.Message>{message}</S.Message>
        <S.CancelButton onClick={dispatchCloseConfirm}>취소</S.CancelButton>
        <S.ApproveButton onClick={onApprove}>확인</S.ApproveButton>
      </S.Inner>
    </S.Container>
  );
};
