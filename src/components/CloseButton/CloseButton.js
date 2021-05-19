import CloseIcon from '../svg/CloseIcon/CloseIcon';
import { ButtonContainer } from './CloseButton.styles';

const CloseButton = ({ ...props }) => (
  <ButtonContainer {...props}>
    <CloseIcon />
  </ButtonContainer>
);

export default CloseButton;
