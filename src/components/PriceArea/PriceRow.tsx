import { ReactNode } from 'react';
import Row from '../common/Row';
import * as styles from './PriceArea.style';

interface PriceRowProps {
  label: ReactNode;
  amount: number;
  testId?: string;
  minus?: boolean;
}

function PriceRow({ label, amount, minus, testId }: PriceRowProps) {
  return (
    <Row
      left={<p css={styles.priceTitleCss}>{label}</p>}
      right={
        minus ? (
          <p css={styles.priceCss} data-testid={testId}>
            -{amount.toLocaleString()}원
          </p>
        ) : (
          <p css={styles.priceCss} data-testid={testId}>
            {amount.toLocaleString()}원
          </p>
        )
      }
    />
  );
}

export default PriceRow;
