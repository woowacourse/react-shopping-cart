import { VFC } from 'react';
import Text from '../../shared/Text';
import { StyledModal, ModalInner, ResetButton, ModalHeader } from './styles';

interface Props {
  header: string;
  description?: string;
  buttonText: string;
  onReset: () => void;
}

const ErrorFallbackPopup: VFC<Props> = ({ header, description, buttonText, onReset }) => {
  return (
    <StyledModal>
      <ModalInner>
        <ModalHeader>{header}</ModalHeader>
        <Text>{description}</Text>
        <ResetButton type="button" onClick={onReset}>
          {buttonText}
        </ResetButton>
      </ModalInner>
    </StyledModal>
  );
};

export default ErrorFallbackPopup;
