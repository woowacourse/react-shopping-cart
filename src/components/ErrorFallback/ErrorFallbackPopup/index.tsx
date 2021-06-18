import { VFC } from 'react';
import Text from '../../shared/Text';
import { StyledPopup, PopupInner, ResetButton, PopupHeader } from './styles';

interface Props {
  header: string;
  description?: string;
  buttonText: string;
  onReset: () => void;
}

const ErrorFallbackPopup: VFC<Props> = ({ header, description, buttonText, onReset }) => {
  return (
    <StyledPopup>
      <PopupInner>
        <PopupHeader>{header}</PopupHeader>
        <Text>{description}</Text>
        <ResetButton type="button" onClick={onReset}>
          {buttonText}
        </ResetButton>
      </PopupInner>
    </StyledPopup>
  );
};

export default ErrorFallbackPopup;
