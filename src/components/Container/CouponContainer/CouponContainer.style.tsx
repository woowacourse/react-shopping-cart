import styled from 'styled-components';

interface LayoutProps {
  isAvailable: boolean;
}

export const Layout = styled.div<LayoutProps>`
  display: flex;
  flex-direction: column;
  margin: 16px 0;
  row-gap: 4px;

  border-top: 1px solid lightgrey;

  h2 {
    font-size: 16px;
    font-weight: 700;
  }

  p {
    font-size: 12px;
    font-weight: 500;
  }
  ${({ isAvailable }) =>
    !isAvailable &&
    `
    pointer-events: none;

    h2, p {
      color: lightgrey;
    }
  `}
`;

export const CheckButtonAndDescription = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 8px;
  margin: 12px 0;
`;
