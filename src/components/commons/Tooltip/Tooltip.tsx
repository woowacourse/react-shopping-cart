import { useEffect } from 'react';
import * as Styled from './Tooltip.styles';

export interface Props {
  children: React.ReactNode;
  button?: React.ReactNode;
  setTooltipShown?: React.Dispatch<React.SetStateAction<boolean>>;
  timeOut: number;
}

const Tooltip = ({ children, button, setTooltipShown, timeOut }: Props) => {
  useEffect(() => {
    const id = setTimeout(() => {
      setTooltipShown?.(false);
    }, timeOut);

    return () => clearTimeout(id);
  }, [setTooltipShown, timeOut]);

  return (
    <Styled.Tooltip>
      <Styled.ToolTipText>{children}</Styled.ToolTipText>
      <Styled.ToolTipButtonWrapper>{button}</Styled.ToolTipButtonWrapper>
    </Styled.Tooltip>
  );
};

export default Tooltip;
