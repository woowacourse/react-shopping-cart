import styled from 'styled-components';

export default function GridLayout({ children, rowGap, columnGap }) {
  return (
    <LayoutBox rowGap={rowGap} columnGap={columnGap}>
      {children}
    </LayoutBox>
  );
}

GridLayout.defaultProps = {
  rowGap: '27px',
  columnGap: '47px',
};

const LayoutBox = styled.div`
  display: grid;
  row-gap: ${props => props.rowGap};
  column-gap: ${props => props.columnGap};
  place-items: center;
  grid: '. . . .';
`;
