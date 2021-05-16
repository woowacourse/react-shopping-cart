import React, { FC, MouseEventHandler, useState, useEffect, ReactNode } from "react";

import { Container } from "./style";

interface ModalProps {
  closeModal: MouseEventHandler<HTMLDivElement>;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ closeModal: dimmedClick, children }) => {
  const [opacity, setOpacity] = useState<number>(0);

  useEffect(() => {
    setOpacity(1);

    return () => {
      setOpacity(0);
    };
  }, []);

  return (
    <Container onClick={dimmedClick} opacity={opacity}>
      {children}
    </Container>
  );
};

export default Modal;
export { ModalProps };
