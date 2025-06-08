import { useEffect } from 'react';

function useOverlay(closeModal: () => void) {
  function handleClickOverlay(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string
  ) {
    if (e.target instanceof HTMLElement && e.target.id === id) {
      closeModal();
    }
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        closeModal();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeModal]);

  return { handleClickOverlay };
}

export default useOverlay;
