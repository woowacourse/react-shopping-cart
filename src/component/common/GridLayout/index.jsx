import styled from 'styled-components';

export default function GridLayout({ children, rowGap, columnGap }) {
  return (
    <Styled.LayoutBox rowGap={rowGap} columnGap={columnGap}>
      {children}
    </Styled.LayoutBox>
  );
}

GridLayout.defaultProps = {
  rowGap: '27px',
  columnGap: '47px',
};

const Styled = {
  LayoutBox: styled.div`
    display: grid;
    row-gap: ${props => props.rowGap};
    column-gap: ${props => props.columnGap};
    place-items: center;
    grid: '. . . .';
  `,
};
