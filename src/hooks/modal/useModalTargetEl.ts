import { useLayoutEffect, useState } from 'react';

function useModalTargetEl() {
  const [modalTargetEl, setModalTargetEl] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const $layout = document.getElementById('app__layout');
    setModalTargetEl($layout);
  }, []);

  return { modalTargetEl };
}

export default useModalTargetEl;
