import { SerializedStyles } from '@emotion/react';
import { contentLayout } from './ModalContent.style';
import { PropsWithChildren } from 'react';

interface ModalContentProps {
  customCss?: SerializedStyles;
}

export function ModalContent({
  children,
  customCss,
}: PropsWithChildren<ModalContentProps>) {
  return <div css={[contentLayout, customCss]}>{children}</div>;
}
