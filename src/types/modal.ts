export interface ModalPropsType {
  children: React.ReactNode;
  isOpen: boolean;
  position?: 'center' | 'bottom';
  title?: string;
  showCloseButton?: boolean;
  onCloseButtonClick: () => void;
  onBackdropClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
