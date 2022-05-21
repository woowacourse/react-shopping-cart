import styled from 'styled-components';
import { NavBar } from 'component';

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 140px 0 60px;
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
