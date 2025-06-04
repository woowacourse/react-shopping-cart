import { PropsWithChildren } from 'react';

import { StyledAppLayout } from './AppLayout.styled';

export const AppLayout = ({ children }: PropsWithChildren) => {
  return <StyledAppLayout>{children}</StyledAppLayout>;
};
