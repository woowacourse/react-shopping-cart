import { PropsWithChildren } from 'react';
import { styled } from 'styled-components';
import Header from '../Header';

const ContentLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <ContentSection>{children}</ContentSection>
    </>
  );
};

export default ContentLayout;

const ContentSection = styled.section`
  width: 100%;
  margin: 140px auto 0 auto;
`;
