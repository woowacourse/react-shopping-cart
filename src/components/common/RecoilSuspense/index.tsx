import React from "react";
import { Loadable } from "recoil";

interface RecoilSuspenseProps<T> {
  loadable: Loadable<T>;
  fallback: React.ReactNode;
  children: React.ReactNode;
}

function RecoilSuspense<T>({
  loadable,
  fallback,
  children,
}: RecoilSuspenseProps<T>) {
  if (loadable.state === "loading") {
    return <>{fallback}</>;
  }

  if (loadable.state === "hasValue") {
    return <>{children}</>;
  }

  return null;
}

export default RecoilSuspense;
