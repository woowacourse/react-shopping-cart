import { css } from '@emotion/react';
import { ReactNode, ComponentProps } from 'react';

interface RowProps extends ComponentProps<'div'> {
  left: ReactNode;
  right: ReactNode;
  testId?: string;
}

const rowStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px 0'
});

function Row({ left, right, testId, className, ...rest }: RowProps) {
  return (
    <div css={rowStyle} className={className} data-testid={testId} {...rest}>
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}

export default Row;
