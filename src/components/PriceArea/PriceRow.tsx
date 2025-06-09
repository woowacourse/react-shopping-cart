import { ReactNode } from 'react';
import Row from '../common/Row';
import * as styles from './PriceArea.style';

interface PriceRowProps {
  label: ReactNode;
  amount: number;
  testId?: string;
}

function PriceRow({ label, amount, testId }: PriceRowProps) {
  return (
    <Row
      left={<p css={styles.priceTitleCss}>{label}</p>}
      right={
        <p css={styles.priceCss} data-testid={testId}>
          {amount.toLocaleString()}원
        </p>
      }
    />
  );
}

export default PriceRow;
