import styled from '@emotion/styled';
import type { PropsWithChildren } from 'react';

const PageTemplate = ({ children }: PropsWithChildren) => {
  return <PageWrapper>{children}</PageWrapper>;
};

export default PageTemplate;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin: 62px 0;
`;
