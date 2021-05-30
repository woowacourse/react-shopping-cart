import * as Styled from './ConfirmModal.styles';
import Modal from '../Modal';
import Button from '../../Button/Button';
import { COLORS } from '../../../../constants';

export interface Props {
  heading: string;
  onClose?: () => void;
  cancelButtonText: string;
  onCancel?: () => void;
  confirmButtonText: string;
  onConfirm?: () => void;
}

const ConfirmModal = ({
  heading = '텍스트를 입력해주세요',
  onClose,
  onCancel,
  cancelButtonText = '취소',
  onConfirm,
  confirmButtonText = '확인',
}: Props) => {
  return (
    <Modal onBackDropClick={onClose}>
      <Styled.ModalContentWrapper>
        <Styled.Text>{heading}</Styled.Text>
        <Styled.ButtonWrapper>
          <Button size="SM" onClick={onCancel} backgroundColor={COLORS.GRAY_300}>
            {cancelButtonText}
          </Button>
          <Button size="SM" onClick={onConfirm}>
            {confirmButtonText}
          </Button>
        </Styled.ButtonWrapper>
      </Styled.ModalContentWrapper>
    </Modal>
  );
};

export default ConfirmModal;
