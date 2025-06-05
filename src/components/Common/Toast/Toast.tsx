import React, { useEffect, useState } from "react";
import { ToastLayout } from "./Toast.style";

interface ToastProps {
  children: React.ReactNode;
}

export default function Toast({ children }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return <div css={ToastLayout}>{children}</div>;
}
