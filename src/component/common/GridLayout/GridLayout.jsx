import styled from 'styled-components';

const Layout = styled.div`
  display: grid;
  row-gap: 27px;
  column-gap: 47px;
  place-items: center;
  grid: '. . . .';
`;

function GridLayout({ children }) {
  return <Layout>{children}</Layout>;
}

export default GridLayout;
