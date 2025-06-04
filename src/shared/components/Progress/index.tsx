import { ComponentProps } from 'react';
import styled from '@emotion/styled';

type ProgressProps = {
  /**
   * The current value of the progress bar.
   * Should be a number between 0 and max.
   */
  value: number;
  /**
   * The maximum value of the progress bar.
   * Defaults to 100 if not provided.
   */
  max?: number;
  /**
   * The height of the progress bar.
   * Accepts any valid CSS height value (e.g., '20px', '1rem').
   */
  height?: string;
  /**
   * The color of the progress fill.
   * Defaults to a shade of blue.
   */
  color?: string;
  /**
   * The background color of the progress bar.
   * Defaults to a light gray.
   */
  backgroundColor?: string;
  /**
   * The border radius of the progress bar.
   * Defaults to '16px'.
   */
  borderRadius?: string;
  /**
   * Whether the progress fill should animate its width change.
   * Defaults to true.
   */
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
