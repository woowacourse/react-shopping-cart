import React, { FC, ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
}

const Portal: FC<PortalProps> = ({ children }) => {
  const $modal = document.getElementById("modal");
  if (!$modal) return <></>;

  return createPortal(children, $modal);
};

export default Portal;
