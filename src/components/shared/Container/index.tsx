import styled from 'styled-components';

type FlexDirection = 'row' | 'column';
type JustifyContent = 'center' | 'space-between' | 'space-evenly';

interface Props {
  direction?: FlexDirection;
  justifyContent?: JustifyContent;
  alignCenter?: boolean;
}

const Container = styled.div<Props>`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'column'};
  ${({ justifyContent }) => justifyContent && `justify-content: ${justifyContent}`};
  ${({ alignCenter }) => alignCenter && 'align-items: center;'};
`;

export default Container;
