import { createPortal } from 'react-dom';

interface ModalPortalProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function ModalPortal({ children, ...props }: ModalPortalProps) {
  return createPortal(<div {...props}> {children}</div>, document.body);
}
