import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';

interface UnderLinedTextProps {
  underLineColor?: string;
  color?: string;
  fontSize: string;
}

const UnderLinedText = ({
  underLineColor = `${theme.colors.primary}`,
  color,
  fontSize,
  children,
}: PropsWithChildren<UnderLinedTextProps>) => {
  return (
    <StyledRoot>
      <StyledUnderLine color={color} underLineColor={underLineColor} />
      <StyledText fontSize={fontSize}>{children}</StyledText>
    </StyledRoot>
  );
};

export default UnderLinedText;

const StyledRoot = styled.span`
  position: relative;
`;

const StyledText = styled.span<Pick<UnderLinedTextProps, 'fontSize'>>`
  position: relative;
  font-size: ${({ fontSize }) => fontSize};
`;

const StyledUnderLine = styled.div<Pick<UnderLinedTextProps, 'underLineColor' | 'color'>>`
  width: 100%;
  height: 10px;
  background-color: ${({ underLineColor }) => underLineColor};
  color: ${({ color }) => color || 'inherit'};
  position: absolute;
  bottom: 0;
  right: 0;
`;
