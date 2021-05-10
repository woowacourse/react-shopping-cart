import { COLORS } from '../../../constants';
import Button from '../Button/Button';
import * as Styled from './Tooltip.styles';

export interface Props {
  children: React.ReactNode;
  button?: React.ReactNode;
}

const Tooltip = ({ children, button }: Props) => {
  return (
    <Styled.Tooltip>
      <Styled.ToolTipText>{children}</Styled.ToolTipText>
      <Styled.ToolTipButtonWrapper>{button}</Styled.ToolTipButtonWrapper>
    </Styled.Tooltip>
  );
};

export default Tooltip;
