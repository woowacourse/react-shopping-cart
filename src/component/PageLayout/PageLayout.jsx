import styled from 'styled-components';
import { NavBar } from 'component';

const Body = styled.div`
  display: flex;
  justify-content: center;
  padding: 60px 0;
`;

function PageLayout({ children }) {
  return (
    <>
      <NavBar />
      <Body>{children}</Body>
    </>
  );
}

export default PageLayout;
