import { PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';
import theme from 'styles/theme';

interface UnderLinedTextProps {
  underLineColor?: string;
  color?: string;
  fontSize: string;
  fontWeight?: string;
}

const UnderLinedText = ({
  underLineColor = `${theme.colors.primary}`,
  color,
  fontSize,
  fontWeight,
  children,
}: PropsWithChildren<UnderLinedTextProps>) => {
  return (
    <StyledRoot>
      <StyledUnderLine color={color} underLineColor={underLineColor} />
      <StyledText fontSize={fontSize} fontWeight={fontWeight}>
        {children}
      </StyledText>
    </StyledRoot>
  );
};

export default UnderLinedText;

const StyledRoot = styled.span`
  position: relative;
`;

const StyledText = styled.span<Pick<UnderLinedTextProps, 'fontSize' | 'fontWeight'>>`
  position: relative;
  ${({ fontSize, fontWeight }) => css`
    font-size: ${fontSize};
    font-weight: ${fontWeight || 'inherit'};
  `}
`;

const StyledUnderLine = styled.div<Pick<UnderLinedTextProps, 'underLineColor' | 'color'>>`
  width: 100%;
  height: 10px;
  position: absolute;
  bottom: 0;
  right: 0;
  ${({ underLineColor, color }) => css`
    background-color: ${underLineColor};
    color: ${color};
  `}
`;
