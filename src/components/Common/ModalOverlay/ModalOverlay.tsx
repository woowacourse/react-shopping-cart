import { SerializedStyles } from '@emotion/react';
import { overlayLayout } from './ModalOverlay.style';

interface ModalOverlayProps {
  setOpen: (open: boolean) => void;
  customCss?: SerializedStyles;
}

export function ModalOverlay({ setOpen, customCss }: ModalOverlayProps) {
  const handleClick = () => {
    setOpen(false);
  };

  return <div onClick={handleClick} css={[overlayLayout, customCss]}></div>;
}
