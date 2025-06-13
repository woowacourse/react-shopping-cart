import { SerializedStyles } from '@emotion/react';
import { overlayLayout } from './ModalOverlay.style';

interface ModalOverlayProps {
  handleOpen: () => void;
  customCss?: SerializedStyles;
}

export function ModalOverlay({ handleOpen, customCss }: ModalOverlayProps) {
  return <div onClick={handleOpen} css={[overlayLayout, customCss]}></div>;
}
