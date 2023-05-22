import ProductList from "../../components/ProductList";
import { ErrorBoundary } from "react-error-boundary";
import Modal from "../../components/Modal";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalContentState, modalOpenState } from "../../recoil/modalAtoms.tsx";

function Home() {
  const [isModalOpen, setModalOpen] = useRecoilState(modalOpenState);
  const modalContent = useRecoilValue(modalContentState);
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <ErrorBoundary
      fallback={<div>상품 목록을 불러오는 도중 문제가 발생했습니다.</div>}
    >
      <ProductList />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </ErrorBoundary>
  );
}

export default Home;
