import * as S from './Modal.styled';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <S.Container>
      <S.Overlay onClick={onClose} />
      <S.Content>{children}</S.Content>
    </S.Container>
  );
}
