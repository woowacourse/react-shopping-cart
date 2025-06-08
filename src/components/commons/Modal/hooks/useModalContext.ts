import { useContext } from 'react';
import { ModalContext } from '..';

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext를 사용할 수  없습니다.');
  }
  return context;
};

export default useModalContext;
