import { CancelButtonStyle } from '../styles';
import { ModalButtonProps } from '../types/Modal.types';
import ModalButton from '../../Button';

interface CancelButtonProps extends ModalButtonProps {
  variation?: 'primary' | 'secondary';
  width?: string;
}

const CancelButton = ({
  children = '취소',
  variation = 'primary',
  width = '',
  ...rest
}: CancelButtonProps) => (
  <ModalButton css={CancelButtonStyle(variation, width)} aria-label="취소" {...rest}>
    {children}
  </ModalButton>
);

export default CancelButton;
