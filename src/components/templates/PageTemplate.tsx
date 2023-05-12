import styled from '@emotion/styled';
import type { PropsWithChildren } from 'react';

const PageTemplate = ({ children }: PropsWithChildren) => {
  return <PageWrapper>{children}</PageWrapper>;
};

export default PageTemplate;

const PageWrapper = styled.div`
  width: 100%;
  margin: 62px 0;
  padding: 0 0 62px 0;
  display: flex;
  justify-content: center;
`;
