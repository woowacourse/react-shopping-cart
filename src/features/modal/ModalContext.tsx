import { createContext, PropsWithChildren, useState } from "react";
import Modal from "./Modal";

interface ModalContextType {
  openModal: (modalContent: React.ReactNode) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null
  );

  const openModal = (content: React.ReactNode) => setModalContent(content);
  const closeModal = () => setModalContent(null);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Modal open={modalContent !== null} onClose={closeModal}>
        {modalContent}
      </Modal>
    </ModalContext.Provider>
  );
};
