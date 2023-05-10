import { PropsWithChildren } from 'react';
import { styled } from 'styled-components';

const ContentLayout = ({ children }: PropsWithChildren) => {
  return <ContentSection>{children}</ContentSection>;
};

export default ContentLayout;

const ContentSection = styled.section`
  width: 1200px;
  margin: 0 auto;
`;
