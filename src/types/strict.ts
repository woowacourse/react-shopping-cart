import { PropsWithChildren } from 'react';

export type StrictPropsWithChildren<T = unknown> = PropsWithChildren<T> & {
  children: React.ReactNode;
};
