import { useEffect } from 'react';
import * as Styled from './Tooltip.styles';

export interface Props {
  children: React.ReactNode;
  button?: React.ReactNode;
  setTooltipShown: React.Dispatch<React.SetStateAction<boolean>>;
  timeout: number;
}

const Tooltip = ({ children, button, setTooltipShown, timeout }: Props) => {
  useEffect(() => {
    const id = setTimeout(() => {
      setTooltipShown(false);
    }, timeout);

    return () => clearTimeout(id);
  }, [setTooltipShown, timeout]);

  return (
    <Styled.Tooltip>
      <Styled.ToolTipText>{children}</Styled.ToolTipText>
      <Styled.ToolTipButtonWrapper>{button}</Styled.ToolTipButtonWrapper>
    </Styled.Tooltip>
  );
};

export default Tooltip;
