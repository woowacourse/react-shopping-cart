import { PropsWithChildren } from 'react';
import { RecoilRoot, RecoilState } from 'recoil';

import { CartItemProps } from '@/types/cartItem';

interface AsyncRecoilWrapperProps {
  atom: RecoilState<CartItemProps[]>;
  INITIAL_DATA: CartItemProps[];
}

const asyncRecoilWrapper = ({
  atom,
  INITIAL_DATA,
  children,
}: PropsWithChildren<AsyncRecoilWrapperProps>) => {
  return (
    <RecoilRoot
      initializeState={({ set }) => {
        set(atom, INITIAL_DATA);
      }}
    >
      {children}
    </RecoilRoot>
  );
};

export default asyncRecoilWrapper;
