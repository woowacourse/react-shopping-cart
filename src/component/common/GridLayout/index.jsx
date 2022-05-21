import styled from 'styled-components';

export default function GridLayout({ children }) {
  return <LayoutBox>{children}</LayoutBox>;
}

const LayoutBox = styled.div`
  display: grid;
  row-gap: 27px;
  column-gap: 47px;
  place-items: center;
  grid: '. . . .';
`;
