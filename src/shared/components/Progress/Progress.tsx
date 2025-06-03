import { ComponentProps } from 'react';
import styled from '@emotion/styled';

type ProgressProps = {
  value: number;
  max?: number;
  height?: string;
  color?: string;
  backgroundColor?: string;
  borderRadius?: string;
  animated?: boolean;
} & ComponentProps<'div'>;

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  height = '8px',
  color = 'rgb(51, 94, 175)',
  backgroundColor = '#f3f3f3',
  borderRadius = '16px',
  animated = true,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <ProgressContainer
      height={height}
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <ProgressFill
        width={percentage}
        color={color}
        borderRadius={borderRadius}
        animated={animated}
      />
    </ProgressContainer>
  );
};

const ProgressContainer = styled.div<{
  height: string;
  backgroundColor: string;
  borderRadius: string;
}>`
  width: 100%;
  height: ${(props) => props.height};
  background-color: ${(props) => props.backgroundColor};
  border-radius: ${(props) => props.borderRadius};
  overflow: hidden;
  position: relative;
`;

const ProgressFill = styled.div<{
  width: number;
  color: string;
  borderRadius: string;
  animated: boolean;
}>`
  height: 100%;
  width: ${(props) => props.width}%;
  background-color: ${(props) => props.color};
  border-radius: ${(props) => props.borderRadius};
  transition: ${(props) => (props.animated ? 'width 1.3s ease-in-out' : 'none')};

  background: linear-gradient(
    90deg,
    ${(props) => props.color} 0%,
    ${(props) => props.color}dd 100%
  );
`;
