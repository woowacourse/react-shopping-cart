import styled from 'styled-components';

const StyledGridLayout = styled.div`
  display: grid;
  row-gap: 27px;
  column-gap: 47px;
  place-items: center;
  grid: '. . . .';
`;

function GridLayout({ children }) {
  return <StyledGridLayout>{children}</StyledGridLayout>;
}

export default GridLayout;
