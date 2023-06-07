import { useCallback } from 'react';
import { RecoilState, useRecoilState } from 'recoil';
import { ModalType } from '../service/atom';
import { useBodyScrollLock } from './useBodyScrollLock';

type OpenModalType = {
  callback?: () => void;
};

export const useModal = (modalState: RecoilState<ModalType>) => {
  const [modalDataState, setModalDataState] = useRecoilState(modalState);
  const { lockScroll, openScroll } = useBodyScrollLock();

  const closeModal = useCallback(() => {
    openScroll();
    setModalDataState((prev) => {
      return { ...prev, isOpen: false };
    });
  }, [setModalDataState]);

  const openModal = useCallback(
    ({ callback }: OpenModalType) => {
      lockScroll();
      setModalDataState({
        isOpen: true,
        callBack: callback,
      });
    },
    [setModalDataState],
  );

  return { modalDataState, closeModal, openModal };
};
