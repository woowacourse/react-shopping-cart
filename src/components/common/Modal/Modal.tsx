import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import ReactDOM from 'react-dom';
import { useModal } from '../../../hooks/useModal';

type ModalProps = PropsWithChildren;

const Modal = ({ children }: ModalProps) => {
  const { modalDataState, closeModal } = useModal();

  return (
    <>
      {modalDataState.isOpen &&
        ReactDOM.createPortal(
          <BottomSheetWrapper>
            <BottomSheetDimmed onClick={closeModal} />
            <BottomSheetInner>{children}</BottomSheetInner>
          </BottomSheetWrapper>,
          document.getElementById('modal-root') as HTMLElement,
        )}
    </>
  );
};

export default Modal;

const BottomSheetWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BottomSheetDimmed = styled.div`
  transition: all 0.5s ease;
  width: 100%;
  height: 100%;
  background-color: rgba(51, 51, 58, 0.3);
  position: absolute;
`;

const BottomSheetInner = styled.div`
  transition: all 0.5s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10001;
`;
