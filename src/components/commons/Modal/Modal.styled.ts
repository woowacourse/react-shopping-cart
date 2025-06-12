import styled from '@emotion/styled';

type PositionProps = {
  $position: 'center' | 'bottom';
};
type SizeProps = {
  $size: 'small' | 'medium' | 'large';
};
const BackDrop = styled.div<PositionProps>`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: ${({ $position }) =>
    $position === 'center' ? 'center' : 'flex-end'};
  align-items: center;
  top: 0;
  width: 430px;
  height: 100%;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalLayout = styled.div<PositionProps & SizeProps>`
  position: relative;
  width: ${({ $position, $size }) =>
    $position === 'bottom' ? '100%' : getModalWidth($size)};
  max-height: 100%;
  z-index: 500;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

function getModalWidth(size: 'small' | 'medium' | 'large') {
  switch (size) {
    case 'small':
      return '320px';
    case 'medium':
      return '480px';
    case 'large':
      return '600px';
    default:
      return '100%';
  }
}

const CloseIcon = styled.img`
  position: absolute;
  top: 30px;
  right: 20px;
  cursor: pointer;
`;

type ModalTitleProps = {
  fontSize?: string;
  fontWeight?: string;
};

const ModalTitle = styled.div<ModalTitleProps>`
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  position: absolute;
  top: 20px;
  left: 20px;
  text-align: start;
`;

const ModalContents = styled.div`
  display: flex;
  margin-top: 56px;
  height: 100%;
`;

type ModalButtonProps = {
  $backgroundColor?: string;
  $textColor?: string;
  $size?: 'small' | 'medium' | 'large';
  $border?: string;
};

const ModalButton = styled.button<ModalButtonProps>`
  background-color: ${({ $backgroundColor }) => $backgroundColor || '#ffffff'};
  color: ${({ $textColor }) => $textColor || '#000000'};
  width: ${({ $size }) => getSize($size)};
  border: ${({ $border }) => $border || 'none'};
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  &:focus {
    border: none;
    outline: none;
  }
`;

function getSize(size: 'small' | 'medium' | 'large' | undefined) {
  switch (size) {
    case 'small':
      return '80px';
    case 'medium':
      return '120px';
    case 'large':
      return '300px';
    default:
      return '100%';
  }
}

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid;
  border-radius: 4px;
`;

export {
  BackDrop,
  ModalLayout,
  CloseIcon,
  ModalTitle,
  ModalContents,
  ModalButton,
  ModalButtonContainer,
  ModalInput,
};
