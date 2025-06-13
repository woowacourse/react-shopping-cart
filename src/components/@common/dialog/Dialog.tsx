import {
  ButtonHTMLAttributes,
  createContext,
  PropsWithChildren,
  RefObject,
  useContext,
  useId,
} from 'react';
import useBoolean from '../../../hooks/useBoolean';
import { createPortal } from 'react-dom';
import useOverlay from '../../../hooks/useOverlay';
import { closeButton, content, header, overlay } from './Dialog.styles';
import useMergeRefs from '../../../hooks/useMergeRefs';
import useFocusRef from '../../../hooks/useFocusRef';
import useBodyScrollLock from '../../../hooks/useBodyScrollLock';

interface DialogContextType {
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

export const DialogContext = createContext<DialogContextType>({
  isOpen: false,
  open: () => {},
  close: () => {},
});

const Root = ({ children }: { children: React.ReactNode }) => {
  const { value: isOpen, setTrue: open, setFalse: close } = useBoolean(false);

  useBodyScrollLock(isOpen);

  return (
    <DialogContext.Provider value={{ isOpen, open, close }}>
      {children}
    </DialogContext.Provider>
  );
};

export function useDialogContext() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('컨텍스트가 존재하지 않습니다.');
  }
  return context;
}

interface TriggerProps
  extends PropsWithChildren,
    ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Trigger = ({ children, className, ...props }: TriggerProps) => {
  const { open } = useDialogContext();

  return (
    <button onClick={open} className={className} {...props}>
      {children}
    </button>
  );
};

interface RootProps extends PropsWithChildren {
  root?: HTMLElement;
}

const Portal = ({ children, root = document.body }: RootProps) => {
  const { isOpen } = useDialogContext();
  return createPortal(isOpen ? children : null, root);
};

interface OverlayProps {
  className?: string;
}

const Overlay = ({ className }: OverlayProps) => {
  const { close } = useDialogContext();
  const id = useId();
  const { handleClickOverlay } = useOverlay(close);

  return (
    <div
      css={overlay}
      id={id}
      onClick={(e) => handleClickOverlay(e, id)}
      className={className}
    />
  );
};

interface HeaderProps extends PropsWithChildren {
  className?: string;
}

const Header = ({ children, className }: HeaderProps) => {
  return (
    <div css={header} className={className}>
      {children}
    </div>
  );
};

interface CloseButtonProps
  extends PropsWithChildren,
    ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const CloseButton = ({ children, className, ...props }: CloseButtonProps) => {
  const { close } = useDialogContext();

  return (
    <button css={closeButton} onClick={close} className={className} {...props}>
      {children}
    </button>
  );
};

interface ContentProps extends PropsWithChildren {
  position?: 'center' | 'bottom';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  ref?: RefObject<HTMLDivElement>;
}

const Content = ({
  children,
  position = 'center',
  size = 'medium',
  className,
  ref,
  ...props
}: ContentProps) => {
  const { isOpen } = useDialogContext();
  const { focusRef } = useFocusRef(isOpen);
  const mergedRef = useMergeRefs(focusRef, ref);

  return (
    <div
      css={content(position, size)}
      className={className}
      ref={mergedRef}
      {...props}
    >
      {children}
    </div>
  );
};

export { Portal, Overlay, Header, CloseButton, Content, Trigger, Root };
