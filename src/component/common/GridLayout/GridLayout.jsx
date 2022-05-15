import styled from 'styled-components';

const LayoutBox = styled.div`
  display: grid;
  row-gap: 27px;
  column-gap: 47px;
  place-items: center;
  grid: '. . . .';
`;

function GridLayout({ children }) {
  return <LayoutBox>{children}</LayoutBox>;
}

export default GridLayout;
