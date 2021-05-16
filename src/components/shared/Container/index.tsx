import styled from 'styled-components';

type FlexDirection = 'row' | 'column';
type JustifyContent = 'center' | 'space-between' | 'space-evenly';

interface Props {
  direction?: FlexDirection;
  justifyContent?: JustifyContent;
  alignCenter?: boolean;
  width?: string;
  height?: string;
}

const Container = styled.div<Props>`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'column'};
  ${({ justifyContent }) => justifyContent && `justify-content: ${justifyContent}`};
  ${({ alignCenter }) => alignCenter && 'align-items: center;'};
  ${({ width }) => width && `width: ${width}`};
  ${({ height }) => height && `height: ${height}`};
`;

export default Container;
