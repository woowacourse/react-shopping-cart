import { PropsWithChildren } from 'react';
import { styled } from 'styled-components';

const ContentLayout = ({ children }: PropsWithChildren) => {
  return <ContentSection>{children}</ContentSection>;
};

export default ContentLayout;

const ContentSection = styled.section`
  width: 100%;
  margin: 140px auto 0 auto;
`;
