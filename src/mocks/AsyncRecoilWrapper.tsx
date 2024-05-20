import { PropsWithChildren, Suspense } from 'react';
import { RecoilRoot, RecoilState } from 'recoil';

import { CartItemProps } from '@/types/cartItem';
import LoadingComponent from '@components/common/LoadingComponent';

interface AsyncRecoilWrapperProps {
  atom?: RecoilState<CartItemProps[]>;
  INITIAL_DATA?: CartItemProps[];
}

const AsyncRecoilWrapper = ({
  atom,
  INITIAL_DATA,
  children,
}: PropsWithChildren<AsyncRecoilWrapperProps>) => {
  return (
    <RecoilRoot
      initializeState={({ set }) => {
        if (atom && INITIAL_DATA) set(atom, INITIAL_DATA);
      }}
    >
      <Suspense fallback={<LoadingComponent />}>{children}</Suspense>
    </RecoilRoot>
  );
};

export default AsyncRecoilWrapper;
