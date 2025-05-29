import { css } from "@emotion/css";
import Text from "../@common/Text/Text";

interface PriceRowProps {
  title: string;
  price: number;
  testId?: string;
}

const PriceRow = ({ title, price, testId }: PriceRowProps) => {
  return (
    <div className={PriceRowStyle}>
      <Text text={title} type="medium" />
      <Text text={price.toLocaleString() + "원"} type="large" testId={testId} />
    </div>
  );
};
export default PriceRow;

const PriceRowStyle = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0;
`;
