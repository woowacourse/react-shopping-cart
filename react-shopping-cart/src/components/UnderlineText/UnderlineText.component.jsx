import styled from 'styled-components';
import { Text } from 'components/@shared';
import { LAYER_POSITION } from 'constants';

const UnderlineText = styled(Text).attrs(props => ({
  fontSize: 'medium',
  bold: true,
}))`
  position: relative;
  width: fit-content;
  &::after {
    position: absolute;
    left: 0;
    bottom: 0;
    content: '';
    width: 100%;
    height: 8px;
    background-color: ${({ theme }) => theme.PALETTE.SKY_BLUE_001};
    z-index: ${LAYER_POSITION.BACKGROUND};
  }
`;

export default UnderlineText;
