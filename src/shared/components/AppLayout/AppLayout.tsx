import { PropsWithChildren } from 'react';

import { StyledAppLayout } from '@/shared/components/AppLayout/AppLayout.styled';

export const AppLayout = ({ children }: PropsWithChildren) => {
  return <StyledAppLayout>{children}</StyledAppLayout>;
};
