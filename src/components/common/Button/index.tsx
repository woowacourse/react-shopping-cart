import styled from '@emotion/styled';
import { baseButtonStyle } from '../Modal/styles';
import { ModalButtonProps } from '../Modal/types/Modal.types';

const StyledButton = styled.button`
  ${baseButtonStyle};
`;

const BaseButton = ({ children, disabled, ...rest }: ModalButtonProps) => {
  return (
    <StyledButton {...rest} disabled={disabled}>
      {children}
    </StyledButton>
  );
};

export default BaseButton;
